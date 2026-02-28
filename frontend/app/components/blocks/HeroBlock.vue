
<template>
  <section v-reveal="{ variant: 'fade' }" class="hero mt-14" :class="header?.theme">
    <div class="container">
      <div class="hero__content w-full flex flex-col gap-6 lg:gap-8">
        <!-- Slider Section -->
        <div v-if="displaySlides && displaySlides.length > 0" class="hero__images relative w-full">
          <ClientOnly>
            <Swiper
              v-bind="swiperOptions"
              class="hero-swiper"
            >
              <SwiperSlide v-for="(slide, index) in displaySlides"
                           :key="index"
                           :virtualIndex="index"
                           class="hero-slide"
              >
                <div class="slide-content relative w-full h-full rounded-2xl overflow-hidden">
                  <app-image
                    mode="rounded"
                    img-class="w-full aspect-square sm:aspect-4/3 max-h-[50vh] object-cover object-center border-none"
                    :image="slide.image"
                    :loading="index === 0 ? 'eager' : 'lazy'"
                    :fetchpriority="index === 0 ? 'high' : undefined"
                  />
                  
                  <!-- Slide Content Overlay (если есть title или description) -->
                  <div 
                    v-if="slide.title || slide.description || slide.link"
                    class="absolute top-0 left-0 right-0 px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-20 z-10"
                  >
                    <div class="max-w-3xl">
                      <h3 v-if="slide.title" class="text-white text-xl sm:text-2xl lg:text-4xl font-bold mb-2">
                        {{ slide.title }}
                      </h3>
                      <p v-if="slide.description" class="text-white/90 text-sm sm:text-base lg:text-lg mb-4">
                        {{ slide.description }}
                      </p>
                      <app-button
                        v-if="slide.link && slide.linkText"
                        :href="slide.link"
                        class="pointer-events-auto mt-6 sm:mt-8 lg:mt-10"
                        size="lg"
                      >
                        {{ slide.linkText }}
                      </app-button>
                    </div>
                  </div>

                  <!-- Fade Overlay for non-active slides -->
                  <div class="slide-overlay absolute inset-0 transition-opacity duration-500 z-10"></div>
                </div>
              </SwiperSlide>
            </Swiper>
          </ClientOnly>
        </div>

        <!-- TravelLine Search Block -->
<!--        <div class="hero__search -mt-12 lg:-mt-20 z-20 relative max-w-[1240px] mx-auto w-full px-4">-->
<!--          <TravellineSearchBlock class="w-full rounded-2xl shadow-xl overflow-hidden" />-->
<!--        </div>-->
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/virtual';

import AppImage from "~/components/base/AppImage.vue";
import AppButton from "~/components/base/AppButton.vue";
import TravellineSearchBlock from "~/components/blocks/TravellineSearchBlock.vue";

const props = defineProps({
  id: Number,
  header: Object,
  text: String,
  images: Array,
  slides: Array
})

const displaySlides = computed(() => {

  if (props.slides && props.slides.length > 0) {
    return props.slides;
  }

  if (props.images && props.images.length > 0) {
    return props.images.map(img => ({
      image: img,
      title: null,
      description: null
    }));
  }

  return [];
});

const swiperOptions = {
  modules: [Pagination, Virtual],
  // На мобильных показываем 1 слайд (чтобы hero не казался «мелким»)
  slidesPerView: 1,
  centeredSlides: false,
  spaceBetween: 12,
  breakpoints: {
    640: {
      slidesPerView: 1.2,
      centeredSlides: true,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 1.5,
      centeredSlides: true,
      spaceBetween: 20,
    }
  },
  loop: true,
  loopedSlides: 3,
  virtual: true,
  observer: true,
  observeParents: true,
  pagination: {
    clickable: true,
  }
};

</script>

<style scoped>
.hero-swiper {
  width: 100%;
  height: 100%;
}

.hero-slide {
  /* Не переопределяем ширину слайдов вручную — Swiper сам рассчитает по slidesPerView */
  width: auto;
}

.slide-overlay {
  opacity: 1;
  pointer-events: none;
  background: #FFF6EB;
}

:deep(.swiper-slide-active) .slide-overlay {
  background: #000000;
  opacity: .2;
  z-index: 0;
}

:deep(.swiper-slide-prev) .slide-overlay {
  background: linear-gradient(270deg, rgba(255, 246, 235, 0) 0%, #FFF6EB 30%, #FFF6EB 100%);
}

:deep(.swiper-slide-next) .slide-overlay {
  background: linear-gradient(90deg, rgba(255, 246, 235, 0) 0%, #FFF6EB 30%, #FFF6EB 100%);
}

:deep(.swiper-pagination-bullet) {
  @apply bg-white opacity-50;
}

:deep(.swiper-pagination-bullet-active) {
  @apply bg-white opacity-100;
}

:deep(.swiper-pagination) {
  @apply bottom-4 lg:bottom-6;
}
</style>
