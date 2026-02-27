<template>
  <div v-if="show" class="fixed bottom-4 left-0 right-0 flex justify-center z-50">
    <div class="bg-white p-4 rounded shadow-md flex items-center gap-4 max-w-xl w-full mx-2">
      <span>Мы используем файлы cookies для улучшения работы сайта. Подробнее - в <nuxt-link class="text-accent" to="/politic" >политике конфиденциальности</nuxt-link>.</span>
      <button class="ml-auto px-4 py-1 rounded bg-secondary text-white" @click="accept">
        Хорошо
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
  if (process.client) {
    show.value = !localStorage.getItem('cookie_accepted')
  }
})

function accept() {
  localStorage.setItem('cookie_accepted', 'true')
  show.value = false
}
</script>