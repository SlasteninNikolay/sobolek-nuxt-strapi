<template>
  <component
      :is="tag"
      :href="url"
      :type="tag === 'button' ? nativeType : undefined"
      class="btn-fill-up relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl border transition-all duration-300 group"
      :class="[
      buttonClasses,
      sizeClasses,
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
    ]"
      :disabled="disabled"
      v-bind="attrs"
      @click="handleClick"
  >
    <span
        class="absolute inset-x-0 bottom-0 h-0 bg-secondary-600 transition-all duration-300 group-hover:h-full"
        :class="fillBackgroundClass"
    ></span>

    <Icon
        v-if="icon"
        :name="icon"
        class="relative z-10 text-xl text-medium transition-colors duration-300"
        :class="iconClasses"
    />

    <span class="relative z-10 transition-colors duration-300" :class="textClasses">
      <slot>{{ title }}</slot>
    </span>
  </component>
</template>

<script setup>
const props = defineProps({
  // Тип кнопки
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
  },

  // Размер кнопки
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },

  // URL для ссылки или null для кнопки
  url: {
    type: String,
    default: null
  },

  // Текст кнопки
  title: {
    type: String,
    default: 'Button'
  },

  // Иконка (использует Nuxt Icon)
  icon: {
    type: String,
    default: null
  },

  // Отключенное состояние
  disabled: {
    type: Boolean,
    default: false
  },

  // Нативный тип кнопки (button, submit, reset)
  nativeType: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },

  // Цвет заливки при hover
  fillColor: {
    type: String,
    default: 'primary-300'
  },
})

const emit = defineEmits(['click'])
const vueAttrs = useAttrs()

// Определяем тег: <a> если есть url, иначе <button>
const tag = computed(() => (props.url !== null && props.url !== undefined) ? 'a' : 'button')

const attrs = computed(() => {
  const result = { ...vueAttrs }
  if (tag.value === 'a' && props.url === '') {
    // Для ссылок-пустышек, которые обрабатываются через @click
    result.href = '#'
  }
  return result
})


// Классы для разных типов кнопок
const buttonClasses = computed(() => {
  const classes = {
    primary: 'border-primary bg-primary-500 text-medium text-white hover:border-primary-300',
    secondary: 'border-secondary bg-secondary-500 text-medium text-white hover:border-secondary-600',
    outline: 'border-primary bg-transparent text-primary-500 text-medium hover:border-primary-300',
    ghost: 'border-transparent bg-transparent text-primary-500 text-medium hover:bg-gray-100'
  }
  return classes[props.type] || classes.primary
})

// Классы для разных размеров
const sizeClasses = computed(() => {
  const classes = {
    tiny: 'px-4 py-1 text-sm rounded-lg',
    small: 'px-6 py-2 text-sm rounded-xl',
    medium: 'px-8 py-3 text-base rounded-2xl',
    large: 'px-12 py-4 text-lg rounded-2xl'
  }
  return classes[props.size] || classes.medium
})

// Классы для иконки
const iconClasses = computed(() => {
  if (props.type === 'primary' || props.type === 'secondary') {
    return 'text-white'
  }
  return `text-primary-500 group-hover:text-white`
})

// Классы для текста
const textClasses = computed(() => {
  if (props.type === 'primary' || props.type === 'secondary') {
    return 'text-white'
  }
  return `text-primary-500 group-hover:text-white`
})

// Класс для фоновой заливки
const fillBackgroundClass = computed(() => {
  return `bg-${props.fillColor}`
})

// Обработчик клика
const handleClick = (event) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  // Если это ссылка-заглушка, предотвращаем переход
  if (tag.value === 'a' && (props.url === '' || props.url === '#')) {
    event.preventDefault()
  }
  emit('click', event)
}
</script>

<style scoped>
.btn-fill-up {
  transition: all 0.3s ease;
}

.btn-fill-up:focus {
  outline: none;
  ring: 2px;
  ring-color: theme('colors.primary.300');
  ring-opacity: 50%;
}
</style>