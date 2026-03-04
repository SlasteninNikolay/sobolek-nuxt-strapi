
export function useContactInfo(locale) {
    const config = useRuntimeConfig()

    // Используем правильный URL для SSR и клиента
    const strapiUrl = process.server ? config.public.strapiUrlServer : config.public.strapiUrl

    const { data: contactData, pending: isLoading, error, refresh } = useAsyncData(
        () => `contact-info-${locale.value}`,
        async () => {
            try {
                const url = `${strapiUrl}/api/contact-info?locale=${locale.value}`
                const response = await $fetch(url)

                if (response && response.data) {
                    return response.data.attributes
                }
                return null
            } catch (err) {
                if (process.dev) {
                    console.error('Strapi contact-info error:', err)
                }
                return null
            }
        },
        {
            watch: [locale],
            lazy: false
        }
    )

    const errorMessage = computed(() => {
        if (!error.value) return ''
        return 'Не удалось загрузить контактную информацию'
    })

    return {
        contactData,
        isLoading,
        error,
        errorMessage,
        refresh
    }
}
