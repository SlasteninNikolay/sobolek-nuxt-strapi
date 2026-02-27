<template>
  <app-header />
  <div>
    <!-- Полоса загрузки -->
    <transition name="overlay">
      <div v-if="firstLoad || isTransitioning" class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary">
        <div class="relative w-64" style="height:1px;overflow:visible;">
          <span class="growing-line"></span>
        </div>
      </div>
    </transition>

    <div class="min-h-screen flex flex-col">
      <main class="flex-grow">
        <NuxtPage />
      </main>
      <AppFooter class="mt-auto" />
    </div>
  </div>
  <cookie-notice />

  <!-- Глобальная модалка "Оставить заявку" (открывается из любых кнопок) -->
  <app-lead-modal />
</template>

<script setup>
import { usePageTransition } from '~/composables/usePageTransition'
import { useNuxtApp } from '#app'

const firstLoad = ref(true)
const { isTransitioning, loadingProgress, startTransition, endTransition } = usePageTransition()
const nuxtApp = useNuxtApp()

// Вешаем хуки на все переходы страниц
nuxtApp.hook('page:start', () => startTransition())
nuxtApp.hook('page:finish', () => endTransition())

onMounted(() => {
  firstLoad.value = true
  setTimeout(() => {
    firstLoad.value = false
  }, 600)
})
</script>

<style scoped>
.overlay-leave-active {
  transition: opacity 1.5s;
}
.overlay-enter-from, .overlay-leave-to {
  opacity: 0;
}
.overlay-enter-to, .overlay-leave-from {
  opacity: 1;
}

.growing-line {
  position: absolute;
  left: 50%;
  top: 0;
  height: 1px;
  width: 0;
  background: var(--color-secondary);
  transform: translateX(-50%);
  border-radius: 999px;
  animation: grow-line-center 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
}

@keyframes grow-line-center {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>