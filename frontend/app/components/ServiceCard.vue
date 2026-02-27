<script setup>
import AppImage from '~/components/base/AppImage.vue'

const props = defineProps({
  service: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="relative h-full bg-beige-500">
    <app-image
      :image="service?.image"
      :alt="service?.title || 'Услуга'"
      img-class="w-full h-full object-cover"
    />
    <h4
      v-if="service?.title"
      class="absolute bottom-10 lg:bottom-5 left-5 z-10 text-white text-lg font-semibold"
    >
      {{ service.title }}
    </h4>
  </div>
</template>