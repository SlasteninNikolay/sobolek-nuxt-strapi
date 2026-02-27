
export function usePageData(slug, locale) {
    const { find } = useStrapi()
    const pageData = ref(null)
    const isLoading = ref(false)
    const error = ref(null)
    const errorMessage = ref('')

    async function loadData() {
        try {
            isLoading.value = true
            error.value = null

            const response = await find('pages', {
                filters: { slug: slug.value },
                locale: locale.value,
                populate: [
                    'block',
                    'block.images',
                    'block.header',
                    'block.slides',
                    'block.slides.image',
                    'block.cards',
                    'block.cards.icon',
                    'block.service',
                    'block.service.image',
                    'block.items',
                    'block.items.image',
                    'block.tabs',
                    'block.tabs.photos',
                    'block.tabs.buttons',
                    'block.tabs.buttons.link',
                    'block.gallery',
                    'block.hotel_rooms',
                    'block.hotel_rooms.photos',
                    'block.hotel_rooms.features',
                    'block.hotel_rooms.features.icon',
                    'block.hotel_rooms.buttons',
                    'block.hotel_rooms.buttons.link',
                    'block.buttons',
                    'block.buttons.link',
                ],
            })

            if (response?.data?.length > 0) {
                pageData.value = response.data[0]
            } else {
                pageData.value = null
            }
        } catch (err) {
            error.value = err
            console.error('Strapi error:', err)
            
            // Безопасная обработка сообщения об ошибке
            let message = 'Не удалось загрузить данные страницы'
            
            if (err && typeof err === 'object') {
                if (err.data && err.data.error && err.data.error.message) {
                    message += ` (${err.data.error.message})`
                } else if (err.message) {
                    message += ` (${err.message})`
                }
            } else if (typeof err === 'string') {
                message = err
            }
            
            errorMessage.value = message
        } finally {
            isLoading.value = false
        }
    }

    watch([() => slug.value, () => locale.value], loadData, {
        immediate: true
    })

    return {
        pageData,
        isLoading,
        error,
        errorMessage,
        refresh: loadData
    }
}