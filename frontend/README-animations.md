# Анимации при прокрутке (Scroll Reveal)

В проект добавлена лёгкая анимация появления элементов при прокрутке без сторонних библиотек.

## Как использовать

Директива: `v-reveal` (работает только на клиенте, SSR безопасно).

### 1) По умолчанию

```vue
<section v-reveal>
  ...
</section>
```

По умолчанию используется вариант `up`.

### 2) Быстрый вариант (строкой)

```vue
<div v-reveal="'fade'">...</div>
```

Доступные варианты: `fade | up | down | left | right | zoom`.

### 3) Тонкая настройка

```vue
<li v-reveal="{ variant: 'up', delay: idx * 80, duration: 650 }">...</li>
```

Поля:
- `variant` — тип анимации
- `delay` — задержка (ms)
- `duration` — длительность (ms)
- `once` — анимировать один раз (по умолчанию `true`)
- `rootMargin`, `threshold` — настройки IntersectionObserver (редко нужно)

## Доступность

Если у пользователя включено `prefers-reduced-motion: reduce`, анимации отключаются и контент показывается сразу.

## Где находится реализация

- Директива: `frontend/app/plugins/reveal.ts`
- Стили: `frontend/app/assets/css/main.css` (классы `.reveal`, `.reveal--*`)
