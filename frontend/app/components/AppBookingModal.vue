<script setup lang="ts">
import AppBaseModal from '~/components/base/AppBaseModal.vue'

const { isOpen, roomId, close } = useBookingModal()

let travellineScript: HTMLScriptElement | null = null

const initTravelLine = () => {
  if (typeof window === 'undefined') return

  // На всякий случай очищаем контейнер.
  const container = document.getElementById('tl-booking-form-modal')
  if (container) container.innerHTML = ''

  // Очистка предыдущего скрипта (если модалку открывали ранее)
  if (travellineScript) {
    travellineScript.remove()
    travellineScript = null
  }

  // Полная переинициализация TravelLine
  // (у них глобальные объекты, поэтому сбрасываем)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  try {
    delete w.travelline
    delete w.TL
  } catch {
    // ignore
  }

  ;(function (w: any) {
    const q = [
      ['setContext', 'TL-INT-legenda-camps-ru_2025-09-19', 'ru'],
      [
        'embed',
        'booking-form',
        {
          container: 'tl-booking-form-modal',
        },
      ],
    ]

    const h = ['ru-ibe.tlintegration.ru', 'ibe.travelline.ru', 'ibe.tlintegration.com']

    const t = (w.travelline = w.travelline || {})
    const ti = (t.integration = t.integration || {})
    ti.__cq = ti.__cq ? ti.__cq.concat(q) : q

    // loader.js должен быть один; если уже подхвачен на странице - просто выходим.
    // В таком случае очередь __cq должна обработаться.
    if (ti.__loader) return
    ti.__loader = true

    const d = w.document
    const c = d.getElementsByTagName('head')[0] || d.getElementsByTagName('body')[0]

    function loadNextHost(hosts: string[]) {
      if (hosts.length === 0) {
        // eslint-disable-next-line no-console
        console.error('❌ All TravelLine hosts failed')
        return
      }

      const host = hosts[0]

      const script = d.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://' + host + '/integration/loader.js'

      script.onerror = function () {
        loadNextHost(hosts.slice(1))
      }

      c.appendChild(script)
      travellineScript = script
    }

    loadNextHost(h)
  })(window)
}

watch(
  () => isOpen.value,
  (open) => {
    if (!open) return

    // Даем модалке отрендериться, затем инициализируем TL.
    setTimeout(initTravelLine, 0)
  }
)

onUnmounted(() => {
  if (travellineScript) travellineScript.remove()
})

const headerTitle = computed(() => (roomId.value ? 'Бронирование номера' : 'Бронирование'))
</script>

<template>
  <Teleport to="body">
    <app-base-modal :show="isOpen" @close="close" mode="form">
      <template #header>
        <div class="pe-4">{{ headerTitle }}</div>
      </template>

      <template #body>
        <div class="p-4 md:p-6">
          <!-- TravelLine booking-form -->
          <div id="tl-booking-form-modal"></div>
        </div>
      </template>
    </app-base-modal>
  </Teleport>
</template>
