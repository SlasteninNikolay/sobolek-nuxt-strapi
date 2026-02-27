module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
    {
        name: 'strapi::cors',
        config: {
            origin: ['http://localhost:3000', "https://sobolek-bratsk.ru","https://sobolek-bratsk.ru", "https://cms.sobolek-bratsk.ru"],
            methods: ['GET', 'POST', 'OPTIONS'],
            headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
            keepHeaderOnError: true,
        },
    },
    // Кеширование статических файлов
    'global::cache',
];
