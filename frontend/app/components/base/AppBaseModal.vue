<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  /* 'pdf' - Show pdf file, 'form' - Show pdf file
  * */
  mode: {
    type: String,
    required: true,
    default: null
  }
})

const emit = defineEmits(['close'])

const mode = computed(() => {
  return props.mode
})

const showAllPages = ref(true)

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Transition name="modal">
    <div
        class="fixed top-0 left-0 w-full h-screen z-50"
        v-if="show"
        role="dialog"
        aria-modal="true"
    >
      <div class="modal-overlay bg-primary/80 w-full h-full z-0 absolute top-0 left-0" @click="$emit('close')"></div>
      <div
          class="modal-container w-full max-w-[90%] md:max-w-xl mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 max-h-[80vh] flex flex-col"
      >
        <div class="modal-header bg-secondary text-white leading-none uppercase font-medium flex items-center justify-between ps-8 pe-4 py-3 flex-shrink-0 rounded-t-lg bg-[url('/images/svg/pattern.svg')] bg-contain bg-center bg-blend-soft-light">
          <slot name="header"></slot>
          <button
              class="text-2xl cursor-pointer h-8 w-8 duration-300 hover:text-accent flex items-center justify-center leading-none rounded-full transition-colors"
              @click="$emit('close')"
              aria-label="Закрыть"
          >
            &times;
          </button>
        </div>

        <div
            class="modal-body flex-1 overflow-x-hidden overflow-y-auto bg-white"
            :class="{ 'border-2 border-secondary': mode === 'pdf' }"
        >
          <slot
              name="body"
              :page="mode === 'pdf' ? showAllPages : null"
          >
          </slot>
        </div>

        <div class="modal-footer flex-shrink-0 bg-gray-50 rounded-b-lg">
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Анимация для модального окна */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Анимация для оверлея */
.modal-enter-active .modal-overlay,
.modal-leave-active .modal-overlay {
  transition: opacity 0.3s ease;
}

.modal-enter-from .modal-overlay,
.modal-leave-to .modal-overlay {
  opacity: 0;
}

/* Анимация для контейнера модального окна */
.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

.modal-container {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
}

.modal-header {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.modal-body {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
</style>