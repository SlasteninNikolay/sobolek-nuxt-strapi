<script setup>
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

const items = computed(() => {
  const list = (props.tabs || []).filter(Boolean)
  // В Strapi у табов есть поле order — используем его как сортировку.
  return list.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
})

const htmlDescription = computed(() => (props.description ? richTextToHtml(props.description) : ''))

const tabHtml = (tab) => (tab?.content ? richTextToHtml(tab.content) : '')

const resolveButtonType = (theme) => {
  if (!theme) return 'secondary'
  if (theme === 'muted') return 'outline'
  return theme
}

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
  <section v-reveal class="relative py-16 lg:py-28 bg-white overflow-hidden">

    <div class="container relative z-10">
      <object
          class="hidden pointer-events-none lg:block absolute -top-10 left-1/2 w-[560px] -translate-x-1/2 -z-10 opacity-80"
          type="image/svg+xml"
          data="/images/svg/route-3.svg"
      />

      <div v-if="items.length" class="grid grid-cols-1 gap-12 lg:gap-20">
        <article
          v-for="(tab, idx) in items"
          :key="tab?.id ?? tab?.slug ?? idx"
          v-reveal="{ variant: 'fade', delay: idx * 120 }"
          class="relative"
        >
          <app-main-heading
            tag="h2"
            :title="tab?.label"
            class="max-w-[620px]"
          />

          <div class="mt-6 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14 items-stretch">
            <!-- content -->
            <div
              v-reveal="{ variant: idx % 2 === 0 ? 'left' : 'right', delay: idx * 120 + 80 }"
              class="h-full"
              :class="idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'"
            >
              <div
                class="h-full bg-white border-2 border-dashed border-brown-300 rounded-3xl px-6 py-7 lg:px-10 lg:py-10"
              >
                <div
                  v-if="tab?.content"
                  class="events-content text-base text-primary/80"
                  v-html="tabHtml(tab)"
                />

                <div v-if="tab?.buttons?.link?.label" class="mt-6">
                  <base-app-button
                    :url="tab.buttons.link?.href || ''"
                    :type="resolveButtonType(tab.buttons.theme)"
                    size="small"
                    :title="tab.buttons.link?.label"
                    :aria-label="tab.buttons.link?.label"
                    @click="handleButtonClick(tab.buttons, $event)"
                  />
                </div>
              </div>
            </div>

            <!-- media -->
            <div
              v-reveal="{ variant: idx % 2 === 0 ? 'right' : 'left', delay: idx * 120 + 140 }"
              class="h-full"
              :class="idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'"
            >
              <div v-if="tab?.photos?.length" class="h-full">
                <base-app-slider v-if="tab.photos.length > 1" class="h-full">
                  <base-app-image
                    v-for="photo in tab.photos"
                    :key="photo.id"
                    :image="photo"
                    img-class="w-full min-h-[260px] lg:min-h-[380px] max-h-[520px] rounded-3xl object-cover object-bottom"
                  />
                </base-app-slider>

                <base-app-image
                  v-else
                  :image="tab.photos[0]"
                  img-class="w-full min-h-[260px] lg:min-h-[380px] max-h-[520px] rounded-3xl object-cover object-bottom"
                />
              </div>

              <div v-else class="w-full min-h-[260px] lg:min-h-[380px] rounded-3xl bg-beige-100" />
            </div>
          </div>
        </article>
      </div>
    </div>

    <object class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full -z-20" type="image/svg+xml" data="/images/svg/wave.svg" />

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
  top: -15%;
  left: 45%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 100%;
  background: url("/images/svg/line-4.svg") no-repeat;
  background-size: contain;
  z-index: -1;
}

.events-content :deep(p) {
  @apply mb-3 last:mb-0;
}

.events-content :deep(ul) {
  @apply mt-3 mb-3 list-disc pl-5 space-y-2;
}

.events-content :deep(ol) {
  @apply mt-3 mb-3 list-decimal pl-5 space-y-2;
}

.events-content :deep(li) {
  @apply text-primary/80;
}

.events-content :deep(strong) {
  @apply font-semibold text-primary;
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
