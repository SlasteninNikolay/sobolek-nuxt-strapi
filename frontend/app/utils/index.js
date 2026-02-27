
export function getStrapiURL(path = '') {
    const config = useRuntimeConfig()
    const baseUrl = config.public.strapiUrl || "http://localhost:1337"
    return `${baseUrl}${path}`
}

export function getStrapiMedia(url) {

    if (url == null) {
        return null
    }

    const config = useRuntimeConfig()
    // Всегда используем клиентский URL (localhost:1337), даже при SSR
    // Это нужно, чтобы браузер мог загрузить изображения
    const baseUrl = config.public.strapiUrl || "http://localhost:1337"

    // Если URL уже абсолютный, возвращаем как есть
    if (url.startsWith("http") || url.startsWith("//")) {
        return url
    }

    // Для относительных путей добавляем базовый URL
    const result = `${baseUrl}${url}`
    return result
}

// handle the redirection to the homepage if the page we are browsinng doesn't exists
export function redirectToHomepage() {
    return {
        redirect: {
            destination: `/`,
            permanent: false,
        },
    };
}

// This function will build the url to fetch on the Strapi API
export function getData(slug, locale) {
    const slugToReturn = `/${slug}?lang=${locale}`;
    const apiUrl = `/pages?slug=${slug}&_locale=${locale}`;

    return {
        data: getStrapiURL(apiUrl),
        slug: slugToReturn,
    };
}

export function childrenToHtml(children) {
    if (!Array.isArray(children)) return ''
    return children
        .map((child) => {
            if (child.type === 'text') {
                let text = child.text || ''
                if (child.bold) text = `<strong>${text}</strong>`
                if (child.italic) text = `<em>${text}</em>`
                if (child.underline) text = `<u>${text}</u>`
                return text
            }
            if (child.type === 'link') {
                // Очистка URL от дублирования
                let href = child.url || '#'

                // Удаление дублирующихся частей
                href = href.replace(/^(.*?)(mailto:)?/, 'mailto:')

                // Удаление дублирующихся доменов
                const cleanUrl = new URL(href)
                href = `mailto:${cleanUrl.pathname.replace(/^\//, '')}`

                // Получение текста ссылки
                const linkText = childrenToHtml(child.children) || href.replace('mailto:', '')

                return `<a href="${href}" target="_blank">${linkText}</a>`
            }
            return ''
        })
        .join('')
}

export function richTextToHtml(blocks) {
    if (!Array.isArray(blocks)) return '';
    return blocks
        .map((block) => {
            switch (block.type) {
                case 'paragraph':
                    return `<p>${childrenToHtml(block.children)}</p>`;
                case 'heading': {
                    const level = block.level || 1;
                    return `<h${level} class="h${level}">${childrenToHtml(block.children)}</h${level}>`;
                }
                case 'list': {
                    const listTag = block.format === 'unordered' ? 'ul' : 'ol';
                    const listClass = block.format === 'unordered'
                        ? 'list-disc pl-6 mb-4'
                        : 'list-decimal pl-6 mb-4';

                    const listItems = (block.children || [])
                        .map((listItem) => {
                            if (listItem.type === 'list-item') {
                                return `<li class="mb-2">${childrenToHtml(listItem.children)}</li>`;
                            }
                            return '';
                        })
                        .join('');

                    return `<${listTag} class="${listClass}">${listItems}</${listTag}>`;
                }

                case 'list-item': {
                    // Обработка вложенных списков
                    const listItemContent = childrenToHtml(block.children);

                    // Если есть вложенные списки, обрабатываем их отдельно
                    const nestedLists = block.children?.filter(child => child.type === 'list') || [];
                    const nestedListsHtml = nestedLists.map(nestedList =>
                        richTextToHtml([nestedList])
                    ).join('');

                    return `<li class="mb-2">${listItemContent}${nestedListsHtml}</li>`;
                }
                default:
                    console.warn('Неизвестный тип блока:', block.type);
                    return '';
            }
        })
        .filter(item => item !== '')
        .join('');
}