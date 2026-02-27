<script setup>
import {
  YandexMap as YMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
  YandexMapControls,
  YandexMapZoomControl,
  YandexMapScaleControl,
} from 'vue-yandex-maps'
import { ref, shallowRef, defineProps } from 'vue'

const props = defineProps({
  coordinates: {
    type: Array,
    required: true,
    default: () => [101.64749474732908,56.21158977631718]
  },
  name: {
    type: String,
    default: 'База отдыха Соболек',
  },
  description: {
    type: String,
    default: 'Иркутская область, г.Братск',
  },
})

const mapSettings = {
  location: {
    center: props.coordinates,
    zoom: 14,
    maxZoom: 15,
  },
  behaviors: ['drag', 'dblClickZoom', 'rightMouseButtonMagnifier', 'multiTouch'],
}

const openMarker = ref(false)

const customization = shallowRef([
  //  кастомные стили карты
])
</script>

<template>
  <YMap :settings="mapSettings" width="100%" height="480px">
    <YandexMapDefaultSchemeLayer :settings="{ customization }" />
    <YandexMapDefaultFeaturesLayer />
    <YandexMapMarker
        :settings="{
        coordinates: props.coordinates,
        onClick: () => (openMarker = !openMarker),
        zIndex: openMarker ? 1 : 0,
      }"
    >
      <div class="marker">
        <div v-if="openMarker" class="popup" @click.stop="openMarker = false">
          <button
              class="popup__close"
              @click.stop="openMarker = false"
              aria-label="Закрыть"
          ></button>
          <h6 class="popup__title">{{ props.name }}</h6>
          <p class="popup__description">{{ props.description }}</p>
        </div>
      </div>
    </YandexMapMarker>
    <yandex-map-controls :settings="{ position: 'right' }">
      <yandex-map-zoom-control />
    </yandex-map-controls>
    <yandex-map-controls :settings="{ position: 'bottom' }">
      <yandex-map-scale-control />
    </yandex-map-controls>
  </YMap>
</template>
<style scoped>
.marker {
  position: relative;
  width: 32px;
  height: 40px;
  background: url('/images/svg/marker.svg') no-repeat;
  background-size: contain;
  cursor: pointer;
  transition-duration: 3s;

  &:hover {
    transform: scale(1.05);
  }
}

.popup {
  position: absolute;
  left: 50%;
  bottom: 110%;
  transform: translateX(-50%);
  min-width: 240px;
  max-width: 340px;
  padding: 14px 24px 14px 24px;
  background: #fff;
  color: #222;
  border-radius: 12px;
  box-shadow:
      0 6px 24px rgba(0, 0, 0, 0.18),
      0 1.5px 6px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  z-index: 10;
  border: 1.5px solid var(--color-primary);

  &__title {
    margin-bottom: 12px;
    font-size: 16px;
    color: var(--color-primary);
  }

  &__description {
    font-size: 14px;
    color: var(--color-primary);
  }
}

.popup__close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 2;
}

.popup__close::before,
.popup__close::after {
  content: '';
  position: absolute;
  left: 9px;
  top: 3px;
  width: 2px;
  height: 14px;
  background: var(--color-primary);
  border-radius: 1px;
}

.popup__close::before {
  transform: rotate(45deg);
}

.popup__close::after {
  transform: rotate(-45deg);
}

.popup__close:hover::before,
.popup__close:hover::after {
  background: var(--color-primary);
}
</style>
