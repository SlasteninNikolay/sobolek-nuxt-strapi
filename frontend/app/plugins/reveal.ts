import { defineNuxtPlugin } from '#app'

type RevealVariant = 'fade' | 'up' | 'down' | 'left' | 'right' | 'zoom'

type RevealOptions = {
  /** Анимация */
  variant?: RevealVariant
  /** задержка в ms */
  delay?: number
  /** длительность в ms */
  duration?: number
  /** насколько раньше/позже триггерить появление */
  rootMargin?: string
  /** порог IntersectionObserver */
  threshold?: number
  /** анимировать только один раз */
  once?: boolean
}

const DEFAULTS: Required<Omit<RevealOptions, 'delay' | 'duration'>> &
  Pick<RevealOptions, 'delay' | 'duration'> = {
  variant: 'up',
  delay: 0,
  duration: 700,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.12,
  once: true
}

const toNumber = (value: unknown): number | undefined => {
  if (value === null || value === undefined || value === '') return undefined
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

const normalizeBinding = (value: unknown): RevealOptions => {
  // v-reveal / v-reveal="'fade'" / v-reveal="{ variant: 'fade', delay: 120 }"
  if (typeof value === 'string') return { variant: value as RevealVariant }
  if (typeof value === 'object' && value) return value as RevealOptions
  return {}
}

const isReducedMotion = () => {
  if (typeof window === 'undefined') return true
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

const isInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  // Считаем “видимым” с запасом 10% (чтобы верх экрана не мигал)
  return rect.top <= vh * 0.9
}

type ElWithReveal = HTMLElement & { __revealObserver?: IntersectionObserver }

export default defineNuxtPlugin((nuxtApp) => {
  // Важно: директива должна существовать и на сервере,
  // иначе Vue SSR падает при использовании неразрешённой директивы.

  // Nuxt 4: `process.client` может быть недоступен в браузерной сборке.
  // Используем compile-time флаги Vite/Nuxt.
  const isClient = import.meta.client

  const sharedObserver =
    isClient &&
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    !isReducedMotion()
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const el = entry.target as ElWithReveal
              const once = el.dataset.revealOnce !== 'false'

              if (entry.isIntersecting) {
                el.classList.add('reveal-in')
                if (once) sharedObserver.unobserve(el)
              } else if (!once) {
                el.classList.remove('reveal-in')
              }
            }
          },
          {
            root: null,
            rootMargin: DEFAULTS.rootMargin,
            threshold: DEFAULTS.threshold
          }
        )
      : null

  nuxtApp.vueApp.directive('reveal', {
    // SSR: ничего не добавляем в HTML, чтобы контент не был скрыт на сервере.
    // Но наличие getSSRProps предотвращает падение SSR-рендера.
    getSSRProps() {
      return {}
    },

    created(el, binding) {
      if (!isClient) return

      const options = { ...DEFAULTS, ...normalizeBinding(binding.value) }
      const target = el as ElWithReveal

      target.classList.add('reveal')
      target.classList.add(`reveal--${options.variant}`)

      const delay = toNumber(options.delay) ?? 0
      const duration = toNumber(options.duration) ?? DEFAULTS.duration

      target.style.setProperty('--reveal-delay', `${delay}ms`)
      target.style.setProperty('--reveal-duration', `${duration}ms`)
      target.dataset.revealOnce = String(options.once)
    },

    mounted(el, binding) {
      if (!isClient) return

      const target = el as ElWithReveal
      const options = { ...DEFAULTS, ...normalizeBinding(binding.value) }

      // prefers-reduced-motion: показываем сразу
      if (isReducedMotion()) {
        target.classList.add('reveal-in')
        return
      }

      // Чтобы не было “мигания” у элементов в первом экране: если уже в зоне видимости — показываем сразу.
      if (isInViewport(target)) {
        target.classList.add('reveal-in')
      }

      if (!sharedObserver) {
        target.classList.add('reveal-in')
        return
      }

      const needsCustomObserver =
        options.rootMargin !== DEFAULTS.rootMargin || options.threshold !== DEFAULTS.threshold

      if (!needsCustomObserver) {
        sharedObserver.observe(target)
        return
      }

      const customObserver = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            target.classList.add('reveal-in')
            if (options.once) obs.unobserve(target)
          }
        },
        {
          root: null,
          rootMargin: options.rootMargin,
          threshold: options.threshold
        }
      )

      target.__revealObserver = customObserver
      customObserver.observe(target)
    },

    unmounted(el) {
      if (!isClient) return

      const target = el as ElWithReveal

      if (target.__revealObserver) {
        target.__revealObserver.unobserve(target)
        target.__revealObserver.disconnect()
        delete target.__revealObserver
      } else {
        sharedObserver?.unobserve(target)
      }
    }
  })
})
