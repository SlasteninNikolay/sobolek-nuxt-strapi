export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    if (response.body && typeof response.body === 'string') {
      // Заменяем Docker сервисные URL на localhost для браузера
      response.body = response.body
        .replace(/http:\/\/cms:1337/g, 'http://localhost:1337')
        .replace(/http:\/\/host\.docker\.internal:1337/g, 'http://localhost:1337')
    }
  })
})
