
<template>
  <section v-reveal="{ variant: 'fade' }" class="hero relative mt-12 lg:mt-14 pb-16 lg:pb-24" :class="header?.theme">
    <div class="container">
      <div class="hero__content w-full grid grid-cols-1 lg:grid-cols-1 gap-6 lg:gap-8 items-center">
        <div v-if="images && images.length === 1" class="hero__image rounded-2xl relative lg:order-2 w-full overflow-hidden">
          <div class="absolute top-0 left-0 flex flex-col items-center justify-start gap-16 w-full h-full px-6 py-10 lg:p-12 z-10">
            <app-main-heading class="self-start" theme="secondary" :title="header?.title || 'База отдыха'" />
            <p class="self-start text-white max-w-lg">{{ subtitle }}</p>
          </div>
          <app-image mode="rounded" img-class="w-full aspect-square lg:aspect-auto max-h-[50vh] object-cover object-center border-none" :image="images[0]" loading="eager" />
        </div>
      </div>
      <!-- TravelLine Search Block -->
      <div class="hero__search mt-10 z-20 mx-auto w-full">
        <TravellineSearchBlock class="w-full rounded-2xl border border-secondary-300" />
      </div>
    </div>
    <object class="absolute pointer-events-none bottom-0 left-0 w-full -z-10" type="image/svg+xml" data="/images/svg/angle-1.svg"></object>
  </section>
</template>

<script setup>
import AppImage from "~/components/base/AppImage.vue";
import TravellineSearchBlock from "~/components/blocks/TravellineSearchBlock.vue";

defineProps({
  id: Number,
  header: Object,
  subtitle: String,
  images: Array
})
</script>

<style>

  .hero__image:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.3;
    z-index: 0;
  }

</style>