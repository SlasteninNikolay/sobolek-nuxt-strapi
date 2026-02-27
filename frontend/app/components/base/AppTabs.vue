<script setup lang="ts">
import { ref, useSlots, computed } from 'vue'

const slots = useSlots()
const active = ref(0)

function getTabs() {
  const vnodes = slots.default?.() || []
  if (vnodes.length === 1 && Array.isArray(vnodes[0].children)) {
    return vnodes[0].children
  }
  return vnodes
}

const transform = computed(
    () => `translate3d(-${active.value * 100}%, 0, 0)`
)
</script>

<template>
  <div class="overflow-hidden">
    <!-- Хедеры вкладок -->
    <div class="overflow-auto">
      <div class="flex items-center justify-between">
        <div
            v-for="(tabVNode, index) in getTabs()"
            :key="tabVNode.props?.slug ?? index"
            @click="active = index"
            class="tab-item w-full flex items-center justify-center p-2 text-nowrap text-sm md:text-base min-w-72 text-secondary border-e border-t border-b border-secondary cursor-pointer hover:bg-secondary transition-colors duration-300 hover:text-white"
            :class="['tab-title', active === index ? 'active' : '']"
        >
          {{ tabVNode.props?.label ?? `Tab ${index+1}` }}
        </div>
      </div>
    </div>
    <!-- Контент вкладки -->
    <div
        class="mt-8 flex transition-transform [&>*]:w-full [&>*]:shrink-0"
        :style="{ transform }"
        style="will-change: transform"
    >
      <component
          v-for="(tabVNode, index) in getTabs()"
          :key="tabVNode.props?.slug ?? index"
          :is="tabVNode"
      />
    </div>
  </div>
</template>

<style scoped>
.tab-item.active {
  @apply bg-secondary text-white font-medium;
}

.tab-item:last-child {
  @apply rounded-e-lg
}

.tab-item:first-child {
  @apply border-s rounded-s-lg
}
</style>