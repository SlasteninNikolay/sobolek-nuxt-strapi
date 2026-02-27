export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
  router: {
    options: {
        strict: false
    }
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'noindex'
    }
  },
app: {
    head: {
        title: 'LEGENDA Camps - официальный сайт',
        htmlAttrs: {
            lang: 'ru'
        },
        meta: [
            { name: 'description', content: 'Турбаза на черном море' },
            { name: 'keywords', content: 'турбаза, гостиница, отель, красная щель, отдых, бронь' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'robots', content: 'index,follow' },
            { property: 'og:title', content: 'LEGENDA Camps - официальный сайт' },
            { property: 'og:description', content: 'Турбаза на черном море' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://legenda-sobolek.ru' },
            { property: 'og:image', content: '/images/default-image.jpg' },
            { name: 'twitter:image', content: '/images/default-image.jpg' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ]
    }
},
  modules: [
    '@nuxt/image',
    // '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/strapi',
    '@nuxt/icon',
    '@vee-validate/nuxt',
    'nuxt-yandex-metrika'
  ],
    veeValidate: {
        autoImports: true,
        componentNames: {
            Form: 'VeeForm',
            Field: 'VeeField',
            FieldArray: 'VeeFieldArray',
            ErrorMessage: 'VeeErrorMessage'
        }
    },
  devtools: { enabled: true },
    vite: {
        server: {
            allowedHosts: ['localhost', 'legenda-sobolek.ru'],
        },
        css: {
            devSourcemap: true,
        },
        build: {
            cssCodeSplit: true, // Разделять CSS по компонентам
            minify: 'esbuild',
            rollupOptions: {
                output: {
                    manualChunks: {
                        // Критические стили в основной bundle
                        'vendor': ['vue', 'vue-router']
                    }
                }
            }
        }
    },
    experimental: {
        inlineSSRStyles: true, // Встраивает критический CSS в HTML
    },
    features: {
        inlineStyles: true // Включает инлайнинг стилей
    },
    css: ['~/assets/css/main.css'],
    icon: {
        customCollections: [
            {
                prefix: 'my-icon',
                dir: '/usr/app/public/icons'
            },
        ],
    },
    image: {
        screens: {
            xs: 360,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
        },
        quality: 80,
        format: ['webp'],
        domains: ['localhost:1337', 'cms.legenda-sobolek.ru', 'legenda-sobolek.ru'],
        alias: {
            strapi: process.env.STRAPI_CLIENT_URL || 'http://localhost:1337'
        }
    },
    strapi: {
        // Для клиента всегда localhost
        url: 'http://localhost:1337',
        prefix: '/api',
        admin: '/admin',
        version: 'v5',
        cookie: {},
        cookieName: 'strapi_jwt'
    },
    yandexMetrika: {
        id: '',
        debug: true,
        options: {
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            ecommerce: 'dataLayer',
            trackHash: true
        },
    },
    runtimeConfig: {
        strapiToken: process.env.NUXT_STRAPI_TOKEN || '',
        public: {
            // Для клиента (браузера) - всегда localhost в dev, домен в prod
            strapiUrl: process.env.STRAPI_CLIENT_URL || process.env.NUXT_PUBLIC_STRAPI_URL_CLIENT || 'http://localhost:1337',
            // Для SSR - Docker сервис в dev, тот же домен в prod
            strapiUrlServer: process.env.STRAPI_SERVER_URL || process.env.NUXT_PUBLIC_STRAPI_URL || 'http://cms:1337'
        }
    }
})
