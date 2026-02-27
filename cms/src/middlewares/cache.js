module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    // Кешируем только успешные ответы
    if (ctx.status !== 200) {
      return;
    }

    const path = ctx.request.path;

    // Uploads (картинки, файлы) - 1 год
    if (path.startsWith('/uploads/')) {
      ctx.set('Cache-Control', 'public, max-age=31536000, immutable');
      return;
    }

    // API запросы - без кеша
    if (path.startsWith('/api/')) {
      ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      return;
    }
  };
};
