<template>
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
      <app-header />
      <main class="flex-grow  min-h-[80vh]">
        <div class="container h-[80vh] flex items-center justify-center">
          <div class="max-w-md w-full bg-white shadow-lg rounded-xl p-8 flex flex-col items-center">
            <!-- Иконка и цветовая схема для разных ошибок -->
            <template v-if="error.statusCode === 404">
              <div class="bg-blue-100 text-secondary p-4 rounded-full mb-6">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>
              </div>
              <h1 class="text-3xl font-bold mb-2 text-secondary">Страница не найдена</h1>
              <p class="text-gray-600 mb-6 text-center">Похоже, вы указали неверный адрес или страница была удалена.</p>
            </template>
            <template v-else-if="error.statusCode === 500">
              <div class="bg-red-100 text-red-600 p-4 rounded-full mb-6">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8.257 3.099c.366-1.201 2.075-1.201 2.441 0l1.357 4.43a1.02 1.02 0 00.95.691h4.646c1.313 0 1.858 1.684.802 2.539l-3.757 3.004a1.02 1.02 0 00-.364 1.118l1.357 4.431c.366 1.201-.98 2.207-1.964 1.527l-3.757-3.003a1.02 1.02 0 00-1.175 0l-3.757 3.003c-.984.68-2.33-.326-1.964-1.527l1.357-4.43a1.02 1.02 0 00-.364-1.119L2.058 10.76c-1.056-.854-.511-2.539.802-2.539h4.646a1.02 1.02 0 00.95-.69l1.357-4.431z"/></svg>
              </div>
              <h1 class="text-3xl font-bold mb-2 text-red-700">Ошибка сервера</h1>
              <p class="text-gray-600 mb-6 text-center">На сервере произошла ошибка. Пожалуйста, попробуйте позже.</p>
            </template>
            <template v-else>
              <div class="bg-yellow-100 text-yellow-600 p-4 rounded-full mb-6">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>
              </div>
              <h1 class="text-3xl font-bold mb-2 text-yellow-700">Что-то пошло не так…</h1>
              <p class="text-gray-600 mb-6 text-center">Произошла неизвестная ошибка. Попробуйте обновить страницу или вернуться на главную.</p>
            </template>

            <NuxtLink to="/" class="mt-4 inline-block px-6 py-2 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-300 transition">На главную</NuxtLink>
          </div>
        </div>
      </main>
      <AppFooter class="mt-auto" />
    </div>
  </div>
  <cookie-notice />
</template>

<script setup>

defineProps({
  error: Object,
})
</script>