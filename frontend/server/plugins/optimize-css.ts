export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    // Собираем preload для шрифтов
    const fontPreloads: string[] = []
    
    html.head = html.head.map((headContent) => {
      if (typeof headContent === 'string') {
        // Находим шрифты и добавляем preload
        const fontMatches = headContent.matchAll(/href="([^"]*?\.(woff2|woff))"/g)
        for (const match of fontMatches) {
          const fontUrl = match[1]
          if (!fontPreloads.includes(fontUrl)) {
            fontPreloads.push(fontUrl)
          }
        }
        
        // Оставляем entry.css синхронным (критический CSS)
        // Остальные стили загружаем асинхронно
        return headContent.replace(
          /<link([^>]*?)rel="stylesheet"([^>]*?)href="([^"]*?)(AppSlider|AppMainHeading|MapBlock|ServiceBlock|EventsBlock|InfoBlock|LecturesBlock|RoomsBlock|\[\.\.\.slug\])([^"]*?)"([^>]*?)>/g,
          (match, before, middle, hrefStart, componentName, hrefEnd, after) => {
            // Используем media="print" с onload для отложенной загрузки
            return `<link${before}rel="stylesheet"${middle}href="${hrefStart}${componentName}${hrefEnd}" media="print" onload="this.media='all'"${after}><noscript><link rel="stylesheet" href="${hrefStart}${componentName}${hrefEnd}"></noscript>`
          }
        )
      }
      return headContent
    })
    
    // Добавляем preload для шрифтов в начало head
    if (fontPreloads.length > 0) {
      const preloadLinks = fontPreloads.map(url => 
        `<link rel="preload" as="font" type="font/${url.endsWith('.woff2') ? 'woff2' : 'woff'}" href="${url}" crossorigin="anonymous">`
      ).join('')
      
      html.head.unshift(preloadLinks)
    }
  })
})
