<template>
  <article class="flex flex-col gap-6 h-full">
    <header v-if="title" class="flex justify-start items-center gap-4 min-h-16">
      <img :src="getStrapiMedia(iconUrl)" class="text-4xl text-primary-500" :aria-label="title" :alt="title" />
      <h3 class="text-lg/6 font-montserrat font-semibold text-primary text-balance">{{ title }}</h3>
    </header>
   <div v-if="content" v-html="htmlContent" class="h-full px-6 py-7 text-base md:text-base bg-white border border-secondary-300 rounded-2xl" />
  </article>
</template>
<script setup>

  import {getStrapiMedia} from "~/utils/index.js";

  const props = defineProps({
    'title': String,
    'content': Object,
    'iconUrl': String,
  })

  const htmlContent = computed(() => richTextToHtml(props.content))
</script>