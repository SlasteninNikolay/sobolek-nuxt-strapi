<script setup lang="ts">

import AppSlider from "~/components/base/AppSlider.vue";
import AppSliderImage from "~/components/base/AppSliderImage.vue";

const leadModal = useLeadModal()

const props = defineProps({
  room: {
    type: Object,
    required: true,
    default: () => ({}),
  }
})

const htmlRoomDescription = computed(() => richTextToHtml(props.room?.description))

const handleBookingClick = (button: any, event: MouseEvent) => {
  event.preventDefault()

  // Strapi хранит roomId в ссылке (href). Пробрасываем её, вдруг пригодится в будущем.
  const roomId = button?.link?.href || ''
  leadModal.open({
    formType: 'Оставить заявку',
    source: roomId ? `room:${roomId}` : 'room:unknown',
  })
}
</script>

<template>
  <div class="flex flex-col gap-6 lg:grid lg:grid-cols-5 lg:gap-16 pt-14 border-t border-primary-50 first:border-t-0 first:pt-0">
    <div class="col-span-2">
      <app-slider class="h-full max-h-[420px]">
        <app-slider-image
          v-for="(photo, index) in room.photos"
          :key="photo.id || index"
          :src="getStrapiMedia(photo.formats?.small?.url || photo.url)"
          :photo="photo"
          :alt="photo.alternativeText"
        />
      </app-slider>
    </div>
    <div class="col-span-3 flex flex-col gap-6 items-start justify-between">
      <app-main-heading
          tag="h3"
          :title="room?.title"
          class="col-span-2"
          mode="no-highlight"
      />
      <div class="flex flex-wrap lg:grid lg:grid-cols-[minmax(100px,_300px)_minmax(100px,_300px)] gap-2">
        <div v-for="(item, index) in room?.features" :key="index" class="flex items-center gap-2">
          <img :src="getStrapiMedia(item?.icon.url)" class="w-10 h-10 text-primary-500" :alt="item.title" :title="item.title" />
          <span class="text-base lg:text-base text-primary font-semibold">{{ item.title }}</span>
        </div>
      </div>
      <div class="max-w-2xl text-base lg:text-base" v-if="room.description" v-html="htmlRoomDescription">
      </div>
      <base-app-button
          v-for="(button, index) in room.buttons"
          :key="button?.id || index"
          :url="button.link?.href || ''"
          :type="button?.theme"
          size="small"
          :title="button.link?.label || ''"
          :aria-label="button.link?.label || ''"
          @click="handleBookingClick(button, $event)"
      />
    </div>
  </div>
</template>