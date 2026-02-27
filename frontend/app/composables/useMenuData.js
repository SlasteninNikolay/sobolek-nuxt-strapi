
export function useMenuData(locale) {
    const config = useRuntimeConfig()
    
    // Используем правильный URL для SSR и клиента
    const strapiUrl = process.server ? config.public.strapiUrlServer : config.public.strapiUrl
    
    const populateParams = [
        'MainMenuItems',
        'MainMenuItems.logo',
        'MainMenuItems.sections',
        'MainMenuItems.sections.links'
    ].map((field, index) => `populate[${index}]=${encodeURIComponent(field)}`).join('&')
    
    // Используем useAsyncData для SSR
    const { data: menuData, pending: isLoading, error, refresh } = useAsyncData(
        () => `menu-${locale.value}`,
        async () => {
            try {
                const url = `${strapiUrl}/api/top-menu?locale=${locale.value}&${populateParams}`
                const response = await $fetch(url)
                
                // API top-menu возвращает объект, а не массив
                if (response && response.data && response.data.MainMenuItems) {
                    return response.data.MainMenuItems
                }
                return null
            } catch (err) {
                if (process.dev) {
                    console.error('Strapi menu error:', err)
                }
                
                // Если ошибка 403, возвращаем пустое меню
                if (err?.response?.status === 403 || err?.statusCode === 403) {
                    return []
                }
                throw err
            }
        },
        {
            watch: [locale],
            lazy: false
        }
    )
    
    const errorMessage = computed(() => {
        if (!error.value) return ''
        
        if (error.value.response?.status === 403 || error.value.statusCode === 403) {
            return 'Нет доступа к меню (403)'
        }
        if (error.value.message) {
            return error.value.message
        }
        return 'Не удалось загрузить меню'
    })

    return {
        menuData,
        isLoading,
        error,
        errorMessage,
        refresh
    }
}
