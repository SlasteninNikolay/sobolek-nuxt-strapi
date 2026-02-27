<template>
  <div class="relative" @click.outside="isOpen = false">
    <button
        type="button"
        class="w-full h-full px-4 py-3 text-left bg-white border border-gray-200 rounded-2xl  text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-secondary-500 transition-all hover:bg-gray-50 flex items-center justify-between"
        @click.stop="isOpen = !isOpen"
    >
      <span><span class="font-normal">{{ label }}:</span> {{ selectedValue || placeholder }}</span>
      <svg
          :class="`w-4 h-4 mx-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition name="dropdown">
      <div
          v-if="isOpen"
          class="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-2xl z-10 max-h-60 overflow-y-auto"
          @click.stop
      >
        <ul class="py-1">
          <li
              v-for="option in props.options"
              :key="option.value"
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
              @click="selectOption(option)"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Выберите...',
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const selectedValue = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : ''
})

function selectOption(option) {
  emit('update:modelValue', option.value)
  isOpen.value = false
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.98);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>