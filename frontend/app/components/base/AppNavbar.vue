<script setup>
const route = useRoute()

const locale = computed(() => {
  return route.query.locale || 'ru'
})

const { menuData, isLoading, error, errorMessage, refresh } = useMenuData(locale)
</script>

<template>
  <!-- Основные пункты меню -->
  <ul class="inline-flex items-center justify-center px-6 py-1 bg-white/80 rounded-2xl">
    <li v-for="item in menuData" :key="item.id" class="group relative contents">
      <template v-if="item.__component !== 'menu.logo' && item.__component !== 'menu.knopka'">
        <!-- Обычная ссылка -->
        <a
            v-if="item.__component === 'menu.ssylka'"
            :href="item.url"
            class="px-3 py-2 text-lg text-primary hover:text-primary-300 hover:transition-colors duration-200"
        >
          {{ item.title }}
        </a>

        <!-- Выпадающее меню -->
        <div v-else-if="item.__component === 'menu.vypadayushhee-menyu'" class="relative">
          <button
              class="flex items-center px-3 py-2 text-primary font-medium hover:text-primary-300 hover:transition-colors duration-200"
          >
            {{ item.title }}
            <svg
                class="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <ul class="absolute left-0 mt-1 w-48 bg-primary shadow-lg rounded-md py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <li v-for="section in item.sections" :key="section.id">
              <div class="px-3 py-2 text-sm font-semibold text-primary-700 border-b">
                {{ section.title }}
              </div>
              <ul class="space-y-1 py-1">
                <li v-for="link in section.links" :key="link.id">
                  <a
                      :href="link.url"
                      class="block px-3 py-2 text-sm text-primary font-medium hover:text-primary-300 transition-colors duration-200"
                  >
                    {{ link.title }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </template>
    </li>
  </ul>
</template>

<style scoped>

</style>