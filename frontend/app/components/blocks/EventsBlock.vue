<script setup>
import AppTabs from "~/components/base/AppTabs.vue";
import AppTab from "~/components/base/AppTab.vue";
import AppImage from "~/components/base/AppImage.vue";
import AppSlider from "~/components/base/AppSlider.vue";
import AppBaseForm from "~/components/base/AppBaseForm.vue";
import AppBaseModal from "~/components/base/AppBaseModal.vue";

const props = defineProps({
  header: Object,
  description: Object,
  tabs: {
    type: Array,
    required: true,
    default: () => ([]),
  }
})

const htmlDescription = computed(() => richTextToHtml(props.description))

const showModal = ref(false)

const handleButtonClick = (button, event) => {
  event.preventDefault();
  showModal.value = true
}

const onSubmitted = () => {
  setTimeout(() => {
    showModal.value = false
  }, 3000)
}

</script>

<template>
  <section v-reveal class="relative pt-16 pb-8 lg:pb-16 lg:pt-28 bg-white overflow-x-hidden">
    <object class="absolute bottom-0 left-0 w-auto lg:w-full z-0" type="image/svg+xml" data="/images/svg/wave.svg"></object>
    <div class="container">
      <div class="flex flex-col lg:grid lg:grid-cols-2 mb-6 lg:mb-14 gap-6 lg:gap-14">
        <app-main-heading
            tag="h2"
            :title="header?.title"
            class="max-w-[480px]"
        />
        <div
          v-reveal="{ variant: 'fade', delay: 120 }"
          class="max-w-2xl text-base lg:text-lg font-regular lg:font-medium text-balance"
          v-if="description"
          v-html="htmlDescription"
        ></div>
      </div>
      <app-tabs v-reveal="{ variant: 'up', delay: 160 }">
        <app-tab
            v-for="(tab, index) in tabs"
            :key="index"
            :label="tab?.label"
            :slug="tab?.slug"
        >
          <div class="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-10">
            <div class="h-full">
              <app-slider>
                <app-image
                    v-for="photo in tab.photos"
                    :key="photo.id"
                    :image="photo"
                    img-class="w-full min-h-[280px] lg:min-h-[380px] max-h-[480px] border-[10px] border-secondary-50 lg:border-white rounded-2xl object-cover object-bottom"
                />
              </app-slider>
            </div>
            <div class="h-full py-4 px-[10px] flex flex-col items-start justify-start">
              <div class="mb-6 text-base lg:text-base" v-html="richTextToHtml(tab?.content)" />

              <base-app-button
                  :url="tab.buttons.link?.href || ''"
                  :type="tab.buttons.theme || 'secondary'"
                  size="small"
                  :title="tab.buttons.link?.label"
                  :aria-label="tab.buttons.link?.label"
                  @click="handleButtonClick(tab.buttons, $event)"
              />
            </div>
          </div>
        </app-tab>
      </app-tabs>
    </div>
    <Teleport to="body">
      <app-base-modal :show="showModal" @close="showModal = false" mode="form">
        <template #header>
          <div></div>
        </template>
        <template #body>
          <app-base-form @submitted="onSubmitted" form-type="Бронирование мероприятия" />
        </template>
      </app-base-modal>
    </Teleport>
  </section>
</template>

<style scoped>
:deep(.first-word) {
  display: inline-block;
  z-index: 1;
}
:deep(.first-word:after) {
  content: '';
  position: absolute;
  top: -25%;
  left: 25%;
  transform: translate(-50%, 0%);
  width: 60%;
  height: 100%;
  background: url("/images/svg/line-4.svg") no-repeat;
  background-size: contain;
  z-index: -1;
}

@media (min-width:768px) {
  :deep(.first-word:after) {
    width: 100%;
    height: 150%;
    top: -50%;
    left: 50%;
  }
}

</style>