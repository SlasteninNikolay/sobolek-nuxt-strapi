<script setup>
import { computed } from 'vue'
import { getStrapiMedia } from '~/utils/index.js'

const props = defineProps({
  header: Object,
  cards: {
    type: Array,
    default: () => []
  }
})

const items = computed(() => (props.cards || []).filter(Boolean))

const cardDescription = (card) => {
  return richTextToHtml(card?.content)
}
</script>

<template>
  <section v-reveal class="relative py-16 lg:py-24 bg-white overflow-hidden">
    <div class="container">
      <app-main-heading
        tag="h2"
        :title="header?.title"
        class="max-w-[580px]"
      />

      <div
        v-if="items.length"
        class="lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
      >
        <article
          v-for="(card, idx) in items"
          :key="card.id ?? idx"
          v-reveal="{ variant: 'up', delay: idx * 90 }"
          class="bg-white border-2 border-secondary-300 rounded-3xl px-6 py-7"
        >
          <header class="flex items-center gap-4">
            <img
              v-if="card?.icon?.url"
              :src="getStrapiMedia(card.icon.url)"
              class="w-10 h-10 shrink-0"
              :alt="card?.title || ''"
              loading="lazy"
            />
            <h3 class="text-lg/6 font-montserrat font-semibold text-primary text-balance">
              {{ card?.title }}
            </h3>
          </header>

          <div
            v-if="card?.content"
            class="mt-4 text-base text-primary/80"
            v-html="cardDescription(card)"
          />
        </article>
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
  top: 100%;
  left: 0;
  transform: translateY(25%);
  width: 80%;
  height: 22px;
  background: url("/images/svg/line-3.svg") no-repeat;
  background-size: contain;
  z-index: -1;
}

@media (min-width: 768px) {
  :deep(.first-word:after) {
    top: 75%;
    width: 100%;
  }
}
</style>
