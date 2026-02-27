<!-- components/blocks/RichText.vue -->
<template>
  <div class="rich-text" v-html="block.content" />
</template>

<script setup lang="ts">
defineProps<{
  block: any
}>()
</script>