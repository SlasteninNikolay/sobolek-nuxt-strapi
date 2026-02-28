<script setup>
import { computed } from 'vue'
import { getStrapiMedia } from '~/utils/index.js'

const props = defineProps({
  header: Object,
  items: {
    type: Array,
    default: () => []
  }
})

const list = computed(() => (props.items || []).filter(Boolean))

const imgSrc = (item) => {
  const url = item?.image?.formats?.medium?.url || item?.image?.url
  return url ? getStrapiMedia(url) : null
}
</script>

<template>
  <section v-reveal class="relative py-16 lg:py-28 bg-white overflow-hidden">
    <div class="container">
      <app-main-heading
        tag="h2"
        :title="header?.title"
        class="max-w-[680px]"
      />

      <div v-if="list.length" class="mt-10 lg:mt-14 grid grid-cols-1 gap-6 lg:gap-10">
        <article
            v-for="(item, idx) in list"
            :key="item.id ?? idx"
            v-reveal="{ variant: 'fade', delay: idx * 110 }"
            class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-stretch"
        >
          <!-- media - занимает 1 колонку -->
          <div
              v-reveal="{ variant: idx % 2 === 0 ? 'right' : 'left', delay: idx * 110 + 60 }"
              class="rounded-3xl overflow-hidden min-h-[220px] lg:min-h-[260px] lg:col-span-1"
              :class="idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'"
          >
            <img
                v-if="imgSrc(item)"
                :src="imgSrc(item)"
                class="w-full h-full object-cover"
                :alt="item?.title || ''"
                loading="lazy"
            />
            <div v-else class="w-full h-full bg-beige-500" />
          </div>

          <!-- content - занимает 2 колонки -->
          <div
              v-reveal="{ variant: idx % 2 === 0 ? 'left' : 'right', delay: idx * 110 + 120 }"
              class="bg-white border-2 border-dashed border-brown-300 rounded-3xl px-6 py-7 lg:px-10 lg:py-10 flex flex-col gap-4 justify-start lg:col-span-2"
              :class="idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'"
          >
            <h3 class="mt-3 text-lg/6 lg:text-xl font-montserrat font-semibold text-primary text-balance">
              {{ item?.title }}
            </h3>

            <div class="flex items-start gap-3 text-sm text-primary/60">
              <img
                  v-if="item?.icon?.url"
                  :src="getStrapiMedia(item.icon.url)"
                  class="w-10 h-10 shrink-0 inline-flex w-5 h-5 rounded bg-beige-500"
                  :alt="item?.title || ''"
                  loading="lazy"
              />
              <span>{{ item?.label }}</span>
            </div>

            <p v-if="item?.description" class="mt-3 text-base text-primary/80">
              {{ item.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
