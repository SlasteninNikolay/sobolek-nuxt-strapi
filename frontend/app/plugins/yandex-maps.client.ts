import { defineNuxtPlugin } from '#app'
import { createYmaps } from 'vue-yandex-maps'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(
        createYmaps({
            apikey: 'bb753275-daf4-43fa-9089-8a54cfead427',
            lang: 'ru_RU',
        })
    )
})