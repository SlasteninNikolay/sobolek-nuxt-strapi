export default defineNitroConfig({
  // Инлайнинг критических стилей
  inlineDynamicImports: true,
  
  routeRules: {
    // Статические ассеты - 1 год
    '/_nuxt/**': { 
      headers: { 
        'cache-control': 'public, max-age=31536000, immutable' 
      } 
    },
    // Шрифты - 1 год
    '/**/*.woff2': { 
      headers: { 
        'cache-control': 'public, max-age=31536000, immutable' 
      } 
    },
    '/**/*.woff': { 
      headers: { 
        'cache-control': 'public, max-age=31536000, immutable' 
      } 
    },
    // SVG иконки - 1 год
    '/icons/**': { 
      headers: { 
        'cache-control': 'public, max-age=31536000, immutable' 
      } 
    },
    // Favicon - 1 неделя
    '/favicon.ico': { 
      headers: { 
        'cache-control': 'public, max-age=604800' 
      } 
    },
    // HTML страницы - без кеша (SSR)
    '/**': { 
      headers: { 
        'cache-control': 'public, max-age=0, must-revalidate' 
      } 
    }
  }
})
