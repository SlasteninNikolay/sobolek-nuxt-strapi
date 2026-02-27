<script setup>

const props = defineProps({
  header: Object,
  description: Object,
  gallery: Array,
})

const htmlDescription = computed(() => richTextToHtml(props.description))

</script>

<template>
  <section class="relative pt-16 pb-14 lg:pb-0 lg:pt-28 bg-beige-500 overflow-hidden">
    <object class="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-auto h-auto z-0" type="image/svg+xml" data="/images/svg/route-4.svg"></object>
    <div class="container">
      <div class="flex flex-col lg:grid lg:grid-cols-2 mb-6 lg:mb-14 gap-6 lg:gap-14">
        <app-main-heading
            tag="h2"
            :title="header?.title"
            class="max-w-[480px]"
        />
        <div class="max-w-2xl text-base lg:text-lg font-regular lg:font-medium text-balance" v-if="description" v-html="htmlDescription"></div>
      </div>
      <div class="h-full">
        <base-app-gallery :photos="gallery" />
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.first-word) {
  position: relative;
  display: inline-block;
  z-index: 2;
}

:deep(.first-word:after) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0%, 50%);
  width: 100%;
  height: 100%;
  background: url("/images/svg/line-1.svg") no-repeat;
  background-size: contain;
  z-index: -1;
}

@media (min-width:768px) {
  :deep(.first-word:after) {
    top: 50%;
  }
}
</style>