<script setup>

const props = defineProps({
  header: Object,
  description: Object,
})

const htmlDescription = computed(() => richTextToHtml(props.description))

</script>

<template>
  <section class="relative py-24 overflow-hidden">
    <object class="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 z-0" type="image/svg+xml" data="/images/svg/route-5.svg"></object>
    <object class="absolute top-0 -translate-y-[10%] left-0 max-h-[900px] -z-10" type="image/svg+xml" data="/images/svg/sea-2.svg"></object>
    <div class="container">
      <div class="flex flex-col lg:grid lg:grid-cols-2 mb-6 lg:mb-14 gap-6 lg:gap-14">
        <app-main-heading
            tag="h2"
            :title="header?.title"
        />
        <div class="max-w-2xl text-lg font-medium text-balance" v-if="description" v-html="htmlDescription"></div>
      </div>
      <div class="w-full border-[10px] border-white rounded-2xl">
        <BaseAppYandexMap 
          class="rounded-2xl" 
          :coordinates="[101.64750939753344,56.211554533662536]"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.first-word) {
  display: inline-block;
  z-index: 2;
}
:deep(.first-word:after) {
  content: '';
  position: absolute;
  top: -25%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 160%;
  height: 160%;
  background: url("/images/svg/line-4.svg") no-repeat;
  background-size: contain;
  z-index: -1;
}

@media (min-width:768px) {
  :deep(.first-word:after) {
    width: 200%;
    height: 200%;
    top: -50%;
    left: 70%;
    transform: translate(-50%, 0%);
  }
}
</style>