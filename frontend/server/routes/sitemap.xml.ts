export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  // Используем серверный URL для запросов внутри SSR/API
  const strapiUrl = config.public.strapiUrlServer || 'http://cms:1337'

  try {
    // Получаем все страницы из Strapi
    // Нам нужны slug, updatedAt и настройки SEO (preventIndexing)
    const response = await $fetch(`${strapiUrl}/api/pages?fields[0]=slug&fields[1]=updatedAt&populate[SEO][fields][0]=preventIndexing&locale=ru&pagination[limit]=100`)
    
    const pages = response?.data || []
    const baseUrl = 'https://sobolek-bratsk.ru'
    
    let urlEntries = []

    // Обрабатываем страницы из CMS
    if (Array.isArray(pages)) {
      urlEntries = pages
        .filter((page) => {
          // Исключаем страницы, где явно запрещена индексация в SEO компоненте
          return !page.attributes?.SEO?.preventIndexing && !page.SEO?.preventIndexing
        })
        .map((page) => {
          // Учитываем разницу в структуре ответа Strapi v4/v5 (attributes или плоский объект)
          const slugVal = page.attributes?.slug || page.slug
          const updatedAtVal = page.attributes?.updatedAt || page.updatedAt
          
          const slug = slugVal === 'home' ? '' : slugVal
          // Формируем полный URL
          const loc = slug ? `${baseUrl}/${slug}` : `${baseUrl}/`
          
          const lastmod = updatedAtVal ? new Date(updatedAtVal).toISOString() : new Date().toISOString()
          const priority = slugVal === 'home' ? '1.0' : '0.8'
          const changefreq = 'weekly'
          
          return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
        })
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>`

    event.node.res.setHeader('Content-Type', 'application/xml')
    return sitemap
  } catch (error) {
    console.error('Sitemap generation error:', error)
    
    // Если ошибка - возвращаем минимальный sitemap с главной страницей
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sobolek-bratsk.ru/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`

    event.node.res.setHeader('Content-Type', 'application/xml')
    return fallbackSitemap
  }
})
