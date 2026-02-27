<template>
  <div
      class="block h-full w-full"
      :class="[mode === 'rounded' ? 'rounded-2xl overflow-hidden' : '']"
  >
    <picture class="block h-full w-full">
      <source
          v-if="image?.url && !imageError"
          :srcset="getImageUrlWithCacheBuster(image.url)"
          media="(min-width: 1600px)"
      />
      <source
          v-if="image?.formats?.large?.url && !imageError"
          :srcset="getImageUrlWithCacheBuster(image.formats.large.url)"
          media="(min-width: 992px)"
      />
      <source
          v-if="image?.formats?.medium?.url && !imageError"
          :srcset="getImageUrlWithCacheBuster(image.formats.medium.url)"
          media="(min-width: 768px)"
      />
      <img
          :src="getImageSrc"
          :alt="getAltText"
          :loading="loading"
          :fetchpriority="fetchpriority"
          class="block w-full h-full object-cover"
          :class="imgClass"
          @error="handleImageError"
          @load="handleImageLoad"
      />
    </picture>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: Object,
    default: () => ({})
  },
  alt: {
    type: String,
    default: ''
  },
  imgClass: {
    type: String,
    default: ''
  },
  loading: {
    type: String,
    default: 'lazy'
  },
  fetchpriority: {
    type: String,
    default: undefined
  },
  mode: {
    type: String,
    default: ''
  }
})

const config = useRuntimeConfig()
const imageError = ref(false)
const imageLoaded = ref(false)

// Всегда используем клиентский URL для изображений в HTML
const getImageUrl = (path) => {
  if (!path) return ''

  // Если путь уже абсолютный URL, возвращаем как есть
  if (path.startsWith('http')) {
    return path
  }

  // Всегда используем клиентский URL (localhost:1337), даже при SSR
  // Это нужно, чтобы браузер мог загрузить изображения
  const baseUrl = config.public.strapiUrl

  // Если путь начинается с /, добавляем базовый URL
  if (path.startsWith('/')) {
    return `${baseUrl}${path}`
  }

  // Для относительных путей
  return `${baseUrl}/${path}`
}

const getImageUrlWithCacheBuster = (path) => {
  let url = getImageUrl(path)
  if (!url) return ''
  
  const cacheBuster = props.image?.updatedAt 
    ? new Date(props.image.updatedAt).getTime() 
    : props.image?.hash;
    
  if (cacheBuster) {
    const separator = url.includes('?') ? '&' : '?'
    url = `${url}${separator}v=${cacheBuster}`
  }
  
  return url
}

const getImageSrc = computed(() => {
  if (!props.image?.url || imageError.value) {
    return '/placeholder-image.jpg'
  }

  const imagePath = props.image.formats?.medium?.url || props.image.url
  return getImageUrlWithCacheBuster(imagePath)
})

const getAltText = computed(() => {
  return props.alt || props.image?.alternativeText || props.image?.name || 'Image'
})

const handleImageError = () => {
  if (process.dev) {
    console.error('Failed to load image:', props.image?.url)
  }
  imageError.value = true
}

const handleImageLoad = () => {
  imageLoaded.value = true
}
</script>