export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const strapiUrl = process.server ? config.public.strapiUrlServer : config.public.strapiUrl

  try {
    // Получаем все страницы из Strapi
    const response = await $fetch(`${strapiUrl}/api/pages?fields[0]=slug&fields[1]=updatedAt&populate[SEO][fields][0]=preventIndexing&locale=ru&pagination[limit]=100`)
    
    const pages = response?.data || []
    const baseUrl = 'https://legenda-sobolek.ru'
    
    // Фильтруем страницы, где не запрещена индексация
    const urls = pages
      .filter((page) => !page.SEO?.preventIndexing)
      .map((page) => {
        const slug = page.slug === 'home' ? '' : page.slug
        const lastmod = page.updatedAt ? new Date(page.updatedAt).toISOString() : new Date().toISOString()
        const priority = page.slug === 'home' ? '1.0' : '0.8'
        
        return `  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
      })
      .join('\n')

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

    event.node.res.setHeader('Content-Type', 'application/xml')
    return sitemap
  } catch (error) {
    // Если ошибка - возвращаем минимальный sitemap с главной страницей
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://legenda-sobolek.ru/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`

    event.node.res.setHeader('Content-Type', 'application/xml')
    return fallbackSitemap
  }
})
