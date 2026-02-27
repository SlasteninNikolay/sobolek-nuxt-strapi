<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, EffectCreative, Grid } from 'swiper/modules';
import { useAttrs } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import 'swiper/css/grid';
import { useSlots } from 'vue';
import { computed } from 'vue';

const props = defineProps({
  gridMode: { type: Boolean, default: false },
});

const sliderComponent = ref(null)
const attrs = useAttrs();
const slots = useSlots();

function getSlides() {
  const vnodes = slots.default?.() || [];
  if (vnodes.length === 1 && Array.isArray(vnodes[0].children)) {
    return vnodes[0].children;
  }
  return vnodes;
}

const swiperOptions = computed(() => {
  const baseOptions = props.gridMode
      ? {
        modules: [Grid, Pagination, Navigation],
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: true,
        grid: {
          rows: 1,
          fill: 'row'
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            grid: {
              rows: 2,
              fill: 'row'
            },
          },
          1024: {
            slidesPerView: 4,
            grid: {
              rows: 1,
              fill: 'row'
            },
          }
        },
        pagination: {
          clickable: true,
        },
      }
      : {
        modules: [Pagination, EffectCreative, Navigation],
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: true,
        pagination: { clickable: true },
        effect: 'creative',
        creativeEffect: {
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        },
      };

  return { ...baseOptions, ...attrs };
});
</script>

<template>
  <ClientOnly>
    <Swiper
        ref="sliderComponent"
        v-bind="swiperOptions"
        class="w-full h-full grid-slider"
    >
      <SwiperSlide v-for="(vnode, idx) in getSlides()" :key="idx">
        <component :is="vnode" />
      </SwiperSlide>
    </Swiper>
  </ClientOnly>
</template>

<style scoped>
.grid-slider {
  height: 100%;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #fff !important;
  background: rgba(37, 76, 96, .4) !important;
  position: absolute;
  top: 50%;
  transform: translateY(0%);
  z-index: 10;
  border-radius: .5rem;
}

:deep(.swiper-button-next) {
  right: 10px;
}

:deep(.swiper-button-prev) {
  left: 10px;
}

:deep(.swiper-navigation-icon) {
  width: 18px;
  height: 18px;
}
</style>