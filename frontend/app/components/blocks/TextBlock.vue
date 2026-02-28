<script setup>

const props = defineProps({
  header: Object,
  text: Object,
})

const htmlDescription = computed(() => richTextToHtml(props.text))

</script>

<template>
  <section v-reveal class="relative min-h-96 bg-white">
    <div class="container">
      <div class="flex flex-col gap-4 py-10">
        <h2
          v-reveal="{ variant: 'up', delay: 80 }"
          class="heading relative text-2xl md:text-3xl font-medium text-primary text-balance"
        >
          {{ header?.title }}
        </h2>
        <div
          v-if="text"
          v-reveal="{ variant: 'fade', delay: 140 }"
          class="max-w-2xl text-base text-primary font-light text-balance z-10"
          v-html="htmlDescription"
        ></div>
      </div>
    </div>
  </section>
</template>