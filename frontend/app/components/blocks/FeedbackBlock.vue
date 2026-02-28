<script setup lang="ts">
import { computed } from 'vue'
import AppBaseForm from "~/components/base/AppBaseForm.vue";

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

const submitLabel = computed(() => props.buttonText || 'Получить консультацию')

const resolvedFormType = computed(() => props.formType || submitLabel.value)

const leadSource = computed(() => {
  if (process.server) return 'block:feedback'
  return `block:feedback:${window.location.pathname}`
})
</script>

<template>
  <section v-reveal="{ variant: 'fade' }" class="py-10 lg:py-16 bg-white">
    <div class="container">
      <div
        v-reveal="{ variant: 'zoom', delay: 60 }"
        class="relative overflow-hidden bg-beige-100 rounded-3xl  px-6 py-10 lg:px-14 lg:py-14"
      >
        <img
          src="/images/svg/ornament.svg"
          alt=""
          class="pointer-events-none absolute left-1/3 top-1/2 hidden w-72 -translate-y-1/2 -translate-x-1/4 lg:block z-10 opacity-40"
          loading="lazy"
        />

        <div class="relative grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div v-reveal="{ variant: 'left', delay: 140 }">
            <app-main-heading tag="h2" :title="header?.title" mode="no-highlight" />
            <div
              v-if="text"
              class="mt-5 max-w-md text-primary/80 text-base leading-relaxed"
              v-html="htmlText"
            />
          </div>

          <div v-reveal="{ variant: 'right', delay: 220 }" class="w-full max-w-xl">
            <app-base-form
              variant="feedback"
              :form-type="resolvedFormType"
              :submit-label="submitLabel"
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
