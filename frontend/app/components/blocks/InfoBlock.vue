<template>
  <section v-reveal class="relative mt-16 lg:mt-28 pb-0 lg:pb-20 overflow-hidden">
    <div class="container relative">
      <div class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-28">
        <div class="flex flex-col items-start justify-center border border-secondary-300 rounded-3xl p-6 lg:p-0 lg:border-none">
          <app-main-heading
              tag="h2"
              :title="header?.title"
              class="max-w-[480px]"
              v-reveal="{ variant: 'up', delay: 80 }"
          />
          <div class="mt-8 text-base lg:text-base lg:text-balance max-w-[580px]"
               v-if="description"
               v-reveal="{ variant: 'fade', delay: 140 }"
               v-html="htmlDescription"
          ></div>
        </div>
        <!--   /left part    -->
        <div v-if="images && images.length > 0">
          <base-app-image
              v-reveal="{ variant: 'right', delay: 200 }"
              img-class="w-full max-h-[600px] border-[10px] border-white rounded-2xl object-cover object-bottom border translate-y-[40px] lg:-translate-x-[30px] lg:translate-y-[30px] rotate-[3deg]"
              :image="images[0]"
              loading="lazy"
          />
        </div>
        <!--   /right part    -->
      </div>
      <div class="py-20 lg:py-28">

        <base-app-slider
            v-reveal="{ variant: 'up', delay: 240 }"
            slidesPerView="4"
            spaceBetween="30"
            :breakpoints="{
                0:   { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1200: { slidesPerView: 4  }
              }"
            :effect="'fade'"
            class="flex items-start justify-between h-auto w-full"
        >
          <base-app-card
              v-for="card in cards"
              :key="card.id"
              :title="card.title"
              :content="card.content"
              :icon-url="card.icon.url"
          />
        </base-app-slider>
      </div>
    </div>
    <object class="absolute  pointer-events-none top-2/3 lg:top-1/2 right-0 -translate-y-1/2 -z-10" type="image/svg+xml" data="/images/svg/sea.svg"></object>
    <object class="absolute pointer-events-none bottom-0 left-0 w-full -z-50" type="image/svg+xml" data="/images/svg/angle-1.svg"></object>
    <object class="hidden pointer-events-none lg:block absolute -top-24 translate-y-[20%] left-0 lg:w-[100%] -z-20" type="image/svg+xml" data="/images/svg/route-1.svg"></object>
  </section>
</template>
<script setup>

  const props = defineProps({
    id: Number,
    header: Object,
    description: Object,
    images: Array,
    cards: Array,
  })

  const htmlDescription = computed(() => richTextToHtml(props.description))
</script>
<style scoped>
:deep(.first-word) {
  position: relative;
  display: inline-block;
}

:deep(.first-word:after) {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(-20%);
  width: 80%;
  height: 22px;
  background: url("/images/svg/line-1.svg") no-repeat;
  background-size: contain;
  z-index: -1;
}

@media (min-width:768px) {
  :deep(.first-word:after) {
    top: 75%;
    width: 100%;
  }
}
</style>
