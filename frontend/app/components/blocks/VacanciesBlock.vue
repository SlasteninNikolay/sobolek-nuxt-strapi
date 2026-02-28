<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

type Header = {
  title?: string
  theme?: string
}

type VacancyItem = {
  id?: number | string
  title?: string
  content?: any
}

const props = defineProps<{
  header?: Header
  description?: any
  items?: VacancyItem[]
}>()

const resolvedItems = computed(() => (props.items || []).filter(Boolean))

const htmlDescription = computed(() => (props.description ? richTextToHtml(props.description) : ''))

const openIndex = ref<number>(-1)

const isOpen = (idx: number) => openIndex.value === idx

const toggle = (idx: number) => {
  openIndex.value = openIndex.value === idx ? -1 : idx
}

type TransitionEl = Element & { style: CSSStyleDeclaration; scrollHeight: number }

const onEnter = async (el: Element) => {
  const element = el as TransitionEl
  element.style.height = '0'
  element.style.opacity = '0'
  element.style.overflow = 'hidden'

  await nextTick()
  // from 0 -> content height
  element.style.height = `${element.scrollHeight}px`
  element.style.opacity = '1'
}

const onAfterEnter = (el: Element) => {
  const element = el as TransitionEl
  element.style.height = 'auto'
  element.style.overflow = ''
}

const onLeave = (el: Element) => {
  const element = el as TransitionEl
  element.style.overflow = 'hidden'
  element.style.height = `${element.scrollHeight}px`
  element.style.opacity = '1'

  // force reflow so the browser picks up the starting height
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  element.offsetHeight

  element.style.height = '0'
  element.style.opacity = '0'
}

const onAfterLeave = (el: Element) => {
  const element = el as TransitionEl
  element.style.height = ''
  element.style.opacity = ''
  element.style.overflow = ''
}
</script>

<template>
  <section v-reveal class="relative py-16 lg:py-28 bg-white overflow-hidden">
    <div class="container">
      <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-14 items-start">
        <app-main-heading
          tag="h2"
          :title="header?.title"
          class="max-w-[520px]"
          v-reveal="{ variant: 'up', delay: 80 }"
        />

        <div
          v-if="description"
          v-reveal="{ variant: 'fade', delay: 140 }"
          class="max-w-2xl text-base lg:text-lg font-regular lg:font-medium text-primary/80 text-balance"
          v-html="htmlDescription"
        />
      </div>

      <div
        v-if="resolvedItems.length"
        v-reveal="{ variant: 'zoom', delay: 200 }"
        class="mt-10 lg:mt-16 bg-white border-2 border-dashed border-secondary-300 rounded-3xl overflow-hidden"
      >
        <article
          v-for="(item, idx) in resolvedItems"
          :key="item?.id ?? `vacancy-${idx}`"
          class="border-b border-secondary-200 last:border-b-0"
        >
          <button
            type="button"
            class="w-full flex items-center gap-4 px-5 py-6 lg:px-10 lg:py-8 text-left"
            :aria-expanded="isOpen(idx)"
            :aria-controls="`vacancy-panel-${idx}`"
            @click="toggle(idx)"
          >
            <span class="grid place-items-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-secondary-500 shrink-0">
              <Icon name="solar:user-rounded-linear" class="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </span>

            <h3 class="flex-1 text-lg lg:text-xl font-montserrat font-semibold text-primary text-balance">
              {{ item?.title }}
            </h3>

            <span class="shrink-0 text-secondary">
              <Icon
                v-if="!isOpen(idx)"
                name="solar:add-circle-bold"
                class="w-7 h-7 lg:w-8 lg:h-8"
              />
              <Icon
                v-else
                name="solar:minus-circle-bold"
                class="w-7 h-7 lg:w-8 lg:h-8"
              />
            </span>
          </button>

          <Transition
            name="vacancy-accordion"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
            @after-leave="onAfterLeave"
          >
            <div
              v-if="isOpen(idx)"
              :id="`vacancy-panel-${idx}`"
              class="vacancy-panel"
            >
              <div class="px-5 pb-6 lg:px-10 lg:pb-8">
                <div
                  v-if="item?.content"
                  class="ml-0 lg:ml-[72px] text-base leading-relaxed text-primary/80"
                  v-html="richTextToHtml(item.content)"
                />
              </div>
            </div>
          </Transition>
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
  top: 50%;
  left: 0;
  transform: translateY(-25%);
  width: 80%;
  height: 22px;
  background: url("/images/svg/line-1.svg") no-repeat;
  background-size: contain;
  z-index: -1;
}

@media (min-width: 768px) {
  :deep(.first-word:after) {
    top: 75%;
    width: 100%;
  }
}

.vacancy-accordion-enter-active,
.vacancy-accordion-leave-active {
  transition: height 260ms ease, opacity 200ms ease;
  will-change: height, opacity;
}

@media (prefers-reduced-motion: reduce) {
  .vacancy-accordion-enter-active,
  .vacancy-accordion-leave-active {
    transition: none;
  }
}

.vacancy-panel {
  overflow: hidden;
}
</style>
