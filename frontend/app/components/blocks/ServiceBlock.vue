<script setup>
import { computed, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

const props = defineProps({
  header: Object,
  description: Object,
  service: {
    type: Array,
    required: true,
    default: () => [],
  }
})

const duplicatedSlides = computed(() => {
  if (!props.service?.length) return [];
  return [...props.service, ...props.service, ...props.service];
});

const swiperOptions = {
  slidesPerView: 1.5,
  centeredSlides: true,
  spaceBetween: 10,
  loop: true,
  observer: true,
  observeParents: true,
  autoHeight: false,
  breakpoints: {
    640: {
      slidesPerView: 2.5,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 3.5,
      centeredSlides: true,
    },
    1024: {
      slidesPerView: 5,
      centeredSlides: true,
    },
  },
};

const htmlDescription = computed(() => richTextToHtml(props.description))
</script>

<template>
  <section class="relative py-16 lg:py-28 overflow-hidden">
    <object class="absolute top-0 right-0 h-auto lg:h-full -z-20" type="image/svg+xml" data="/images/svg/route-3.svg"></object>
    <div class="container">
      <div class="flex flex-col lg:grid lg:grid-cols-2 mb-6 lg:mb-14 gap-6 lg:gap-14">
        <app-main-heading
            tag="h2"
            :title="header?.title"
            class="max-w-[480px]"
        />
        <div class="max-w-2xl text-base lg:text-lg font-regular lg:font-medium text-balance" v-if="description" v-html="htmlDescription"></div>
      </div>

      <!-- Фиксированный контейнер для слайдера -->
      <div class="slider-container">
        <ClientOnly>
          <Swiper
              ref="sliderComponent"
              v-bind="swiperOptions"
              class="service-swiper"
          >
            <SwiperSlide
                v-for="(item, index) in duplicatedSlides"
                :key="index"
                class="service-slide"
            >
              <service-card
                  class="service-card border-white border-[10px] rounded-2xl"
                  :service="item"
              />
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.first-word) {
  position: relative;
  display: inline-block;
  z-index: 1;
}

:deep(.first-word:after) {
  content: '';
  position: absolute;
  bottom: 10px;
  right: 30%;
  transform: translate(100%, -25%);
  width: 100%;
  height: 100%;
  background: url("/images/svg/line-3.svg") no-repeat;
  background-size: contain;
  z-index: -1;
}

@media (min-width:768px) {
  :deep(.first-word:after) {
    height: 150%;
    bottom: 0;
    right: 100%;
    transform: translate(180%, 10%);
  }
}

/* Фиксированный контейнер для слайдера */
.slider-container {
  width: 100%;
  height: 400px; /* Фиксированная высота на мобильных */
  position: relative;
  overflow: visible;
}

@media (min-width: 768px) {
  .slider-container {
    height: 450px;
  }
}

@media (min-width: 1024px) {
  .slider-container {
    height: 520px;
  }
}

@media (min-width: 1280px) {
  .slider-container {
    height: 580px;
  }
}

.service-swiper {
  width: 100%;
  height: 100%; /* Занимает всю высоту контейнера */
  padding: 20px 0;
}

.service-swiper :deep(.swiper-wrapper) {
  align-items: center;
  height: 100%;
}

.service-swiper :deep(.swiper-slide) {
  height: auto;
  transition: all 0.3s ease;
}

/* Все карточки имеют одинаковую максимальную высоту */
.service-card {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 280px; /* Базовая высота */
  transition: all 0.3s ease;
  margin: auto; /* Центрирование по вертикали */
}

/* Центральный слайд - поднимается вверх, но не увеличивает контейнер */
.service-swiper :deep(.swiper-slide-active) .service-card {
  height: 350px;
  transform: translateY(-10px); /* Поднимаем вверх вместо увеличения контейнера */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

/* Соседние слайды */
.service-swiper :deep(.swiper-slide-next) .service-card,
.service-swiper :deep(.swiper-slide-prev) .service-card {
  height: 310px;
}

/* Адаптивные размеры */
@media (min-width: 768px) {
  .service-card {
    height: 320px;
  }

  .service-swiper :deep(.swiper-slide-next) .service-card,
  .service-swiper :deep(.swiper-slide-prev) .service-card {
    height: 360px;
  }

  .service-swiper :deep(.swiper-slide-active) .service-card {
    height: 400px;
    transform: translateY(-15px);
  }
}

@media (min-width: 1024px) {
  .service-card {
    height: 360px;
  }

  .service-swiper :deep(.swiper-slide-next) .service-card,
  .service-swiper :deep(.swiper-slide-prev) .service-card {
    height: 400px;
  }

  .service-swiper :deep(.swiper-slide-active) .service-card {
    height: 460px;
    transform: translateY(-20px);
  }
}

@media (min-width: 1280px) {
  .service-card {
    height: 400px;
  }

  .service-swiper :deep(.swiper-slide-next) .service-card,
  .service-swiper :deep(.swiper-slide-prev) .service-card {
    height: 440px;
  }

  .service-swiper :deep(.swiper-slide-active) .service-card {
    height: 500px;
    transform: translateY(-25px);
  }
}

.service-card:after {
  content: '';
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.service-slide {
  width: 85%;
  user-select: none;
}

/* Опционально: затемнение для крайних слайдов */
.service-swiper :deep(.swiper-slide:not(.swiper-slide-active):not(.swiper-slide-next):not(.swiper-slide-prev)) .service-card {
  filter: brightness(0.8);
}
</style>