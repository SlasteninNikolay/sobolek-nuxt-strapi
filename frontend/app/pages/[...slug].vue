<template>
  <div>
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Загрузка данных...</p>
    </div>

    <div v-else-if="error" class="error">
      <h2>Ошибка загрузки</h2>
      <p>{{ error }}</p>
      <button @click="refresh" class="retry-btn">Попробовать снова</button>
    </div>

    <div v-else-if="pageData && pageData.data && pageData.data.length > 0">
      <block-manager :blocks="pageData.data[0].block || []" />
    </div>

    <div v-else class="not-found">
      <h2>Страница не найдена</h2>
      <p>Страница с таким адресом не существует.</p>
    </div>
  </div>
</template>

<script setup>
import BlockManager from "~/components/BlockManager.vue";

const route = useRoute()
const config = useRuntimeConfig()

const getSlug = () => {
  if (!route.params.slug) return 'home'

  return Array.isArray(route.params.slug)
      ? route.params.slug.join('/') 
      : route.params.slug || 'home'
}

const getLocale = () => route.query.locale || 'ru'

const { data: asyncData, pending: loading, error, refresh } = await useAsyncData(
    () => `page-${route.fullPath}`,
    async () => {
      try {
        const slug = getSlug()
        const locale = getLocale()

        // Используем разные URL для SSR и клиента
        const strapiUrl = process.server ? config.public.strapiUrlServer : config.public.strapiUrl
        
        const populateFields = [
          'SEO', 'SEO.metaImage', 'block', 'block.images', 'block.header', 'block.services',
          'block.contacts', 'block.contacts.icon', 'block.services.images',
          'block.services.buttons', 'block.services.buttons.link',
          'block.form.name', 'block.form.message', 'block.form.phone',
          'block.form.accept_terms', 'block.buttons.link', 'block.buttons.link.pdf',
          'block.cards', 'block.cards.icon', 'block.hotel_rooms',
          'block.hotel_rooms.photos', 'block.hotel_rooms.buttons',
          'block.hotel_rooms.buttons.link', 'block.hotel_rooms.features',
          'block.hotel_rooms.features.icon', 'block.service', 'block.service.image',
          'block.tabs', 'block.tabs.photos', 'block.tabs.buttons',
          'block.text', 'block.formType', 'block.buttonText',
          'block.tabs.buttons.link', 'block.gallery', 'block.features', 'block.socials',
          'block.slides', 'block.slides.image', 'block.items', 'block.items.icon', 'block.items.image',
          // page.blok-kontakty
          'block.addressIcon', 'block.phoneIcon', 'block.emailIcon',
        ]
        
        const populateParams = populateFields.map((field, index) => 
          `populate[${index}]=${encodeURIComponent(field)}`
        ).join('&')
        
        const url = `${strapiUrl}/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&locale=${locale}&${populateParams}`
        
        const result = await $fetch(url, {
          // Timeout для предотвращения зависания SSR
          timeout: 5000,
        })
        
        // Если данных нет - возвращаем структуру для 404
        if (!result?.data?.length) {
          return {
            data: [],
            meta: { notFound: true },
            error: 'Страница не найдена'
          }
        }

        return result
      } catch (err) {
        const isServer = process.server
        if (process.dev) {
          console.error(`[Ошибка ${isServer ? 'SSR' : 'Клиент'}]:`, err)
        }

        let errorMessage = 'Не удалось загрузить страницу'

        if (err?.message) {
          errorMessage = err.message
        } else if (err?.error?.message) {
          errorMessage = err.error.message
        } else if (err?.data?.error) {
          errorMessage = err.data.error
        } else if (typeof err === 'string') {
          errorMessage = err
        } else if (err?.cause) {
          errorMessage = `Ошибка подключения: ${err.cause.code || err.cause.message || err.cause}`
        }

        return {
          data: [],
          meta: { error: true },
          error: errorMessage
        }
      }
    },
    {
      watch: [route],
      lazy: false
    }
)

// Данные из useAsyncData
const pageData = computed(() => asyncData.value)

// Мета-теги по умолчанию (рендерятся на сервере)
useSeoMeta({
  title: 'Соболек - официальный сайт',
  description: 'Уютная турбаза на Черном море с собственным галечным пляжем и развитой инфраструктурой',
  ogTitle: 'Соболек - официальный сайт',
  ogDescription: 'Уютная турбаза на Черном море с собственным галечным пляжем и развитой инфраструктурой',
  ogType: 'website',
  ogUrl: 'https://sobolek-bratsk.ru',
  ogImage: '/images/default-image.jpg',
  robots: 'index, follow'
})

// Обновляем SEO теги при загрузке данных
watch(pageData, (data) => {
  if (data?.data?.length > 0 && !data.meta?.notFound) {
    const page = data.data[0]
    const title = page.SEO?.metaTitle || page.title || 'Соболек - официальный сайт'
    const description = page.SEO?.metaDescription || 'Уютная турбаза на Черном море с собственным галечным пляжем и развитой инфраструктурой'
    
    // Извлекаем URL из объекта изображения Strapi
    let image = '/images/default-image.jpg'
    if (page.SEO?.metaImage) {
      // metaImage может быть объектом или строкой
      if (typeof page.SEO.metaImage === 'string') {
        image = page.SEO.metaImage
      } else if (page.SEO.metaImage.url) {
        // Если это объект Strapi - берем URL и добавляем полный путь к CMS
        const imageUrl = page.SEO.metaImage.url
        image = imageUrl.startsWith('http') ? imageUrl : `${config.public.strapiUrl}${imageUrl}`
      }
    }
    
    const url = `https://sobolek-bratsk.ru/${page.slug === 'home' ? '' : page.slug}`
    const indexing = page.SEO?.preventIndexing ? 'noindex, nofollow' : 'index, follow'

    useHead({
      link: [{ rel: 'canonical', href: url }]
    })

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogType: 'website',
      ogUrl: url,
      ogImage: image,
      twitterCard: 'summary_large_image',
      twitterImage: image,
      robots: indexing
    })
  } else if (data?.meta?.notFound) {
    useSeoMeta({
      title: 'Страница не найдена - Соболек',
      description: 'Запрошенная страница не существует',
      robots: 'noindex, nofollow'
    })
  }
}, { immediate: true })

definePageMeta({
  layout: 'default',
  alias: ['/:slug(.*)*']
})
</script>

<style scoped>
.loading, .error, .not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error h2, .not-found h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.retry-btn, .home-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.retry-btn:hover, .home-btn:hover {
  background-color: #2980b9;
}

:deep(.first-word) {
  position: relative;
} 

:deep(.first-word:after) {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 160%;
  background: url("../../public/icons/circle.svg") no-repeat;
  background-size: contain;
  z-index: -1;
}


</style>