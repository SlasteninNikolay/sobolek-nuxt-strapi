<template>
  <picture class="block h-full w-full">
    <source 
      v-if="largeSrc" 
      :srcset="largeSrc" 
      media="(min-width: 1024px)"
    />
    <source 
      v-if="mediumSrc" 
      :srcset="mediumSrc" 
      media="(min-width: 768px)"
    />
    <img 
      :src="src" 
      class="w-full h-full object-cover rounded-lg"
      :alt="alt || 'Изображение'"
      loading="lazy"
    />
  </picture>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  photo: {
    type: Object,
    default: null
  }
})

const mediumSrc = computed(() => {
  if (props.photo?.formats?.medium?.url) {
    return getStrapiMedia(props.photo.formats.medium.url)
  }
  return null
})

const largeSrc = computed(() => {
  if (props.photo?.formats?.large?.url) {
    return getStrapiMedia(props.photo.formats.large.url)
  }
  return null
})
</script>
