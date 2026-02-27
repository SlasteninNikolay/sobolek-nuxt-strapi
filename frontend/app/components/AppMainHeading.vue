<template>
      <div>
        <component :is="tag" :class="[tag, theme, mode]" class="main-heading uppercase font-montserrat font-medium text-primary text-balance">
          <span v-if="firstWords" class="first-word">{{ firstWords }}</span>
          {{ restOfTitle }}
        </component>
      </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  theme: String,
  title: String,
  tag: {
    type: String,
    default: 'h1'
  },
  /* mode: '' | 'no-highlight' */
  mode: {
    type: String,
    default: ''
  }
})

const firstWords = computed(() => {
  if (!props.title) return ''
  const words = props.title.trim().split(' ')
  const word2 = words[1] ? words[1] : ''
  return words[0] + ' ' + word2
})

const restOfTitle = computed(() => {
  if (!props.title) return ''
  const words = props.title.trim().split(' ')
  return words.length > 1 ? words.slice(2).join(' ') : ''
})
</script>

<style scoped>
.h1 {
  @apply text-xl font-semibold md:text-4xl w-full;
}

.h2 {
  @apply text-xl font-semibold md:text-2xl;
}

.h3 {
  @apply font-semibold text-2xl;
}

.secondary {
  @apply text-white;
}
.primary {
  @apply text-primary;
}

.h1 .first-word:after {
  display: none;
}

.no-highlight .first-word:after {
  display: none;
}
</style>