<script setup lang="ts">
  defineProps<{
    label?: string;
    slug?: string;
  }>()
</script>

<template>
<div class="">
  <slot />
</div>
</template>