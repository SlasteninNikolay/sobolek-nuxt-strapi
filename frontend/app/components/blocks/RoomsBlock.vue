<script setup>
import RoomCard from "~/components/RoomCard.vue";

const props = defineProps({
    header: Object,
    description: {
      type: Array,
      required: true,
      default: () => [],
    },
    hotel_rooms: {
       type: Array,
       required: true,
       default: () => [],
    }
})

const htmlDescription = computed(() => richTextToHtml(props.description))

</script>

<template>
  <section class="relative pt-16 pb-14 xl:pt-28 xl:pb-36 bg-white overflow-hidden">
    <object class="absolute top-0 right-0 translate-x-2/3 w-[auto] xl:w-full z-0" type="image/svg+xml" data="/images/svg/route-2.svg"></object>
    <object class="absolute bottom-0 left-0 w-auto xl:w-full z-0" type="image/svg+xml" data="/images/svg/wave.svg"></object>
    <div class="relative z-10 container pb-8">
      <div class="flex flex-col xl:grid xl:grid-cols-5 mb-14 gap-6 xl:gap-14">
        <app-main-heading
            tag="h2"
            :title="header?.title"
            class="col-span-2"
            v-reveal="{ variant: 'up', delay: 80 }"
        />
        <div
          v-if="description"
          v-reveal="{ variant: 'fade', delay: 140 }"
          class="col-span-3 max-w-3xl text-base xl:text-lg font-regular xl:font-medium text-balance"
          v-html="htmlDescription"
        ></div>
      </div>
      <div class="grid grid-cols-1 gap-14">
        <room-card
            v-for="(room, index) in hotel_rooms"
            :key="index"
            v-reveal="{ variant: 'up', delay: index * 90 }"
            :room="room"
        />
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
    top: 50%;
    right: -50%;
    transform: translateY(-35%);
    width: 120%;
    height: 150%;
    background: url("/images/svg/line-2.svg") no-repeat;
    background-size: contain;
    z-index: -1;
  }
</style>