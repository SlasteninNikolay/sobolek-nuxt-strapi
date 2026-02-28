<script setup lang="ts">
import { computed } from 'vue'
import { getStrapiMedia } from '~/utils/index.js'

type Header = {
  title?: string
  label?: string
  theme?: string
}

const props = defineProps<{
  header?: Header
  addressIcon?: { url?: string } | null
  address?: string
  phoneIcon?: { url?: string } | null
  phone1?: string
  phone2?: string
  emailIcon?: { url?: string } | null
  email?: string
  coordinates?: [number, number] | number[]
  mapName?: string
  mapDescription?: string
}>()

const addressIconSrc = computed(() => {
  const url = props.addressIcon?.url
  return url ? getStrapiMedia(url) : '/icons/circle.svg'
})

const phoneIconSrc = computed(() => {
  const url = props.phoneIcon?.url
  return url ? getStrapiMedia(url) : '/icons/phone.svg'
})

const emailIconSrc = computed(() => {
  const url = props.emailIcon?.url
  return url ? getStrapiMedia(url) : '/icons/email.svg'
})

const phoneToTel = (phone?: string) => {
  if (!phone) return ''
  // оставляем только + и цифры
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

const emailToMailto = (email?: string) => {
  if (!email) return ''
  return `mailto:${email}`
}

const safeCoordinates = computed(() => {
  const c = props.coordinates
  if (!c || !Array.isArray(c) || c.length < 2) {
    return [101.64749474732908, 56.21158977631718]
  }
  return [Number(c[0]), Number(c[1])]
})
</script>

<template>
  <section v-reveal class="relative pt-16 lg:pt-24 overflow-hidden bg-white">
    <object
      class="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 z-0"
      type="image/svg+xml"
      data="/images/svg/route-6.svg"
    ></object>

    <div class="container relative z-10">
      <app-main-heading
          tag="h2"
          :title="header?.title"
          class="max-w-[580px]"
      />
      <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-14 items-start mt-12">
        <div v-reveal="{ variant: 'left', delay: 120 }" class="h-full max-h-96">
          <div
            class="h-full w-full rounded-3xl border-2 border-dashed border-secondary-300 bg-white px-6 py-7 lg:px-8 lg:py-8"
          >
            <h3 class="text-xl font-montserrat font-semibold text-primary">
              {{ mapName || 'База отдыха Соболек' }}
            </h3>

            <ul class="mt-5 space-y-4 text-primary">
              <li class="flex items-center gap-3">
                <img
                  :src="addressIconSrc"
                  alt=""
                  class="mt-1 h-5 w-5 shrink-0"
                  loading="lazy"
                />
                <div class="text-sm tracking-widest uppercase text-primary/60">
                  {{ address }}
                </div>
              </li>

              <li class="flex gap-3" v-if="phone1">
                <img
                  :src="phoneIconSrc"
                  alt=""
                  class="mt-1 h-5 w-5 shrink-0"
                  loading="lazy"
                />
                <div class="space-y-1">
                  <a
                    class="block text-lg font-medium"
                    :href="phoneToTel(phone1)"
                  >
                    {{ phone1 }}
                  </a>
                  <a
                    v-if="phone2"
                    class="block text-lg font-medium"
                    :href="phoneToTel(phone2)"
                  >
                    {{ phone2 }}
                  </a>
                </div>
              </li>

              <li class="flex gap-3" v-if="email">
                <img
                  :src="emailIconSrc"
                  alt=""
                  class="mt-1 h-5 w-5 shrink-0"
                  loading="lazy"
                />
                <div>
                  <a
                    class="text-lg font-medium"
                    :href="emailToMailto(email)"
                  >
                    {{ email }}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div v-reveal="{ variant: 'right', delay: 200 }" class="w-full">
          <div class="w-full h-full max-h-96 rounded-3xl overflow-hidden">
            <BaseAppYandexMap
              class="rounded-2xl"
              :coordinates="safeCoordinates"
              :name="mapName || 'База отдыха Соболек'"
              :description="mapDescription || address || 'Иркутская область, г.Братск'"
            />
          </div>
        </div>
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
  transform: translateY(15%);
  width: 200%;
  height: 32px;
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

