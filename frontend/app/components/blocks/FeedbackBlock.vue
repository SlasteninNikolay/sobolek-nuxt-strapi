<script setup lang="ts">
import { computed } from 'vue'

type Header = {
  title?: string
  label?: string
  theme?: string
}

const props = defineProps<{
  header?: Header
  text?: any
  formType?: string
  buttonText?: string
}>()

const htmlText = computed(() => (props.text ? richTextToHtml(props.text) : ''))

const leadSource = computed(() => {
  if (process.server) return 'block:feedback'
  return `block:feedback:${window.location.pathname}`
})
</script>

<template>
  <section class="py-10 lg:py-16">
    <div class="container">
      <div
        class="relative overflow-hidden rounded-3xl bg-beige-500 px-6 py-10 lg:px-14 lg:py-14"
      >
        <img
          src="/icons/circle.svg"
          alt=""
          class="pointer-events-none absolute -left-10 top-6 hidden h-56 w-56 opacity-10 lg:block"
          loading="lazy"
        />

        <div class="relative grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">
          <div>
            <app-main-heading tag="h2" :title="header?.title" mode="no-highlight" />
            <div
              v-if="text"
              class="mt-5 max-w-md text-primary/80 text-base leading-relaxed"
              v-html="htmlText"
            />
          </div>

          <div class="w-full max-w-xl">
            <app-base-form
              variant="feedback"
              :submit-label="buttonText || 'Получить консультацию'"
              :form-type="formType || 'Получить консультацию'"
              :source="leadSource"
              :submit-full-width="false"
              name-placeholder="Ваше имя"
              phone-placeholder="Номер телефона"
              :hide-labels="true"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
