<script setup>
const route = useRoute()
const config = useRuntimeConfig();
const strapiUrl = config.public.strapiUrl;

const currentYear = new Date().getFullYear()

const locale = computed(() => {
  return route.query.locale || 'ru'
})

const { menuData, isLoading, error, errorMessage, refresh } = useMenuData(locale)

// Функция для получения всех ссылок в одном плоском массиве
const flatLinks = computed(() => {
  const links = [];
  if (Array.isArray(menuData.value)) {
    menuData.value.forEach((item) => {
      if (item.__component === 'menu.ssylka') {
        links.push({
          id: item.id,
          url: item.url,
          title: item.title,
        });
      } else if (item.__component === 'menu.vypadayushhee-menyu' && item.sections) {
        item.sections.forEach(section => {
          section.links?.forEach(link => {
            links.push({
              id: link.id,
              url: link.url,
              title: link.title,
            });
          });
        });
      }
    });
  }
  return links;
});

function splitArray(array, parts) {
  const result = Array.from({ length: parts }, () => []);
  array.forEach((item, idx) => {
    result[idx % parts].push(item);
  });
  return result;
}

const columns = computed(() => splitArray(flatLinks.value, 2));

const logo = computed(() => {
  if (!Array.isArray(menuData.value)) return null;

  const item = menuData.value.find(i => i.__component === 'menu.logo');
  return item?.logo?.url || null;
});

function scrollToTop() {
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="w-full bg-primary text-white">
    <div class="container mx-auto py-16 lg:py-24 px-4">
      <div class="flex flex-col lg:grid lg:grid-cols-3 items-start gap-16">
        <div class="flex flex-col items-start justify-center w-full">
          <div class="flex flex-col items-start justify-center w-full mb-4">
            <a
                v-if="logo"
                href="/"
            >
              <img
                  :src="`${strapiUrl}${logo}`"
                  alt="Логотип"
                  width="240"
                  class="shrink-0"
                  loading="lazy"
                  decoding="async"
              />
            </a>
            <p class="mt-4 text-sm text-white/50 text-left text-balance">Иркутская область, г. Братск</p>
          </div>
          <div class="mt-auto text-start">
            <p class="px-0 mx-0 mb-0"><a class="text-xl" href="tel:+73953282287">+7 (3953) 282-287</a></p>
            <p class="px-0 mx-0 mb-0"><a class="text-xl" href="tel:+79526217287">+7 (952) 621-72-87</a></p>
            <p class="px-0 mx-0 mb-0"><a class="underline" href="mailto:Sobolek2023@yandex.ru">Sobolek2023@yandex.ru</a></p>
          </div>
        </div>
        <div class="grid grid-cols-2">
          <ul class="gap-3" v-for="(col, idx) in columns" :key="idx">
            <li v-for="item in col" :key="item?.id">
              <NuxtLink
                  :to="item?.url"
                  class="block px-3 py-2 text-xl text-white hover:text-secondary-300 hover:transition-colors duration-200"
              >{{ item?.title }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="ms-0 lg:ms-16">
          <div class="mt-auto flex flex-col items-start gap-1 lg:gap-3 justify-center w-full">
            <NuxtLink class="block px-0 lg:px-3 py-1 lg:py-2 text-white underline hover:text-secondary-300 hover:transition-colors duration-200" to="/rules">Правила проживания</NuxtLink>
            <NuxtLink class="block px-0 lg:px-3 py-1 lg:py-2 text-white underline hover:text-secondary-300 hover:transition-colors duration-200" to="/politic">Политика конфиденциальности</NuxtLink>
            <NuxtLink class="block px-0 lg:px-3 py-1 lg:py-2 text-white underline hover:text-secondary-300 hover:transition-colors duration-200" to="/user-agreement">Пользовательское соглашение</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="container mx-auto px-4 py-10">
        <div class="flex gap-6 flex-row items-center justify-between">
          <p class="text-sm text-white/50">
            © {{ currentYear }}, База отдыха Соболек
          </p>

          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center self-end text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:self-auto"
            aria-label="Наверх"
            @click="scrollToTop"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-8 w-8"
              fill="none"
            >
              <path
                d="M12 20V5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M6.5 10.5L12 5l5.5 5.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>