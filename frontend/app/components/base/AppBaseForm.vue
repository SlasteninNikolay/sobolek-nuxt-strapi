<template>
  <div :class="containerClasses">
    <!-- Сообщение об успехе -->
    <div
        v-if="submitSuccess"
        class="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span class="font-medium">Сообщение успешно отправлено!</span>
      </div>
      <p class="mt-1 text-sm">Мы свяжемся с вами в ближайшее время.</p>
    </div>

    <!-- Сообщение об ошибке -->
    <div
        v-if="submitError"
        class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <span class="font-medium">Ошибка отправки</span>
      </div>
      <p class="mt-1 text-sm">{{ submitError }}</p>
    </div>

    <VeeForm
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, meta }"
      :class="props.variant === 'feedback' ? 'space-y-6' : 'space-y-4'"
    >
      <!-- Поле имени -->
      <div>
        <label
          v-if="!hideLabels"
          for="name"
          class="block text-sm font-medium text-gray-700"
          >Имя *</label
        >
        <VeeField
            name="name"
            type="text"
            autocomplete="name"
            :placeholder="namePlaceholder"
            :class="[
              inputClasses,
              errors.name && errorInputClasses,
            ]"
            :disabled="isSubmitting"
        />
        <VeeErrorMessage name="name" class="h-5 mt-1 text-red-500 text-xs" />
      </div>

      <!-- Поле телефон -->
      <div>
        <label
          v-if="!hideLabels"
          for="phone"
          class="block text-sm font-medium text-gray-700"
          >Телефон *</label
        >
        <VeeField name="phone" v-slot="{ field, errors: fieldErrors }">
          <input
              v-bind="field"
              v-imask="phoneMask"
              type="tel"
              autocomplete="tel"
              :placeholder="phonePlaceholder"
              :class="[
                inputClasses,
                fieldErrors.length && errorInputClasses,
              ]"
              :disabled="isSubmitting"
              @accept="onPhoneAccept"
              @keydown="onPhoneKeydown"
          />
        </VeeField>
        <VeeErrorMessage name="phone" class="h-5 mt-1 text-red-500 text-xs" />
      </div>

      <!-- Кнопка отправки -->
      <button
        type="submit"
        :disabled="!meta.valid || isSubmitting"
        :class="submitButtonClasses"
      >
        <span v-if="isSubmitting" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Отправка...
        </span>
        <span v-else>{{ submitLabel }}</span>
      </button>

      <!-- Чекбокс согласия -->
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <VeeField
            name="agree"
            type="checkbox"
            value="true"
            class="h-4 w-4 text-accent border-gray-300 rounded focus:outline-secondary-200"
            :disabled="isSubmitting"
            :class="{ 'border-red-500': errors.agree }"
          />
        </div>
        <div class="ml-3">
          <label for="agree" class="relative bottom-[2px] font-light text-xs text-gray-700">
            Я согласен с <a class="text-secondary hover:text-secondary-300" href="/politic" target="_blank">политикой конфиденциальности</a> и <a class="text-secondary hover:text-secondary-300" href="/user-agreement" target="_blank">пользовательским соглашением</a>
          </label>
          <VeeErrorMessage name="agree" class="block h-5 mt-1 text-red-500 text-xs" />
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup>
import { object, string, boolean } from 'yup'
import { useYandexMetrika } from "#imports";

// Props для формы
const props = defineProps({
  endpoint: {
    type: String,
    default: 'form-submissions'
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'feedback'].includes(v)
  },
  formType: {
    type: String,
    default: 'callback'
  },
  source: {
    type: String,
    default: ''
  },
  submitLabel: {
    type: String,
    default: 'Отправить'
  },
  submitFullWidth: {
    type: Boolean,
    default: true
  },
  namePlaceholder: {
    type: String,
    default: ''
  },
  phonePlaceholder: {
    type: String,
    default: '+7 (999) 123-45-67'
  },
  hideLabels: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['submitted', 'success', 'error'])

// Состояния формы
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')
const unmaskedPhone = ref('')
const { reachGoal } = useYandexMetrika()

const containerClasses = computed(() => {
  if (props.variant === 'feedback') return 'p-0'
  return 'p-8'
})

const inputClasses = computed(() => {
  if (props.variant === 'feedback') {
    return 'mt-0 block w-full bg-transparent px-0 py-3 text-primary placeholder:text-primary/40 border-b border-primary/30 focus:border-primary outline-none'
  }
  return 'mt-1 px-4 py-2 block w-full rounded-md outline outline-1 outline-secondary-100 focus:outline-secondary-200'
})

const errorInputClasses = computed(() => {
  if (props.variant === 'feedback') return 'border-b-red-500 focus:border-b-red-500'
  return 'outline-red-500'
})

const submitButtonClasses = computed(() => {
  const width = props.submitFullWidth ? 'w-full' : 'w-full sm:w-auto'
  if (props.variant === 'feedback') {
    return [
      width,
      'mt-1 inline-flex justify-center px-8 py-3 rounded-xl text-sm font-medium',
      'border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary',
      'disabled:border-gray-300 disabled:text-gray-400 disabled:bg-transparent disabled:hover:bg-transparent disabled:hover:text-gray-400',
      'disabled:cursor-not-allowed transition-colors',
    ].join(' ')
  }

  return [
    width,
    'flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white',
    'bg-secondary hover:bg-secondary-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary',
    'disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors',
  ].join(' ')
})

// Маска для телефона
const phoneMask = {
  mask: '+{7} (000) 000-00-00',
  lazy: true,
  placeholderChar: '_'
}

// Обработчик изменения телефона с маской
const onPhoneAccept = (e) => {
  const maskRef = e.detail
  unmaskedPhone.value = maskRef.unmaskedValue
}

// Разрешаем стандартное поведение для удаления
const onPhoneKeydown = (e) => {
  if (e.key === 'Backspace' || e.key === 'Delete') {
    return true
  }
}

const schema = object({
  name: string()
      .required('Имя обязательно')
      .min(2, 'Имя должно содержать минимум 2 символа'),
  phone: string()
      .required('Телефон обязателен')
      .min(11, 'Номер введен не полностью'),
  agree: boolean()
      .oneOf([true], 'Необходимо согласие на обработку данных')
      .required('Необходимо согласие на обработку данных')
})

// Функция для получения конфигурации Strapi
const getStrapiConfig = () => {
  const config = useRuntimeConfig()
  return {
    baseUrl: config.public.strapiUrl || 'http://localhost:1337',
  }
}

// Основная функция отправки формы
const onSubmit = async (values, { resetForm }) => {
  isSubmitting.value = true
  submitSuccess.value = false
  submitError.value = ''

  try {
    const strapiConfig = getStrapiConfig()

    // Подготавливаем данные для Strapi
    const formData = {
      name: values.name.trim(),
      phone: values.phone,
      formType: props.formType,
      source: props.source || (process.client ? window.location.href : ''),
      submittedAt: new Date().toISOString(),
      agreeTerms: true
    }

    const { data, error } = await useFetch(`${strapiConfig.baseUrl}/api/${props.endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        data: formData,
      },
      watch: false,
    })

    if (error.value) {
      throw error.value
    }

    const response = data.value


    reachGoal('zayavka')

    submitSuccess.value = true
    emit('submitted', response)

    // Сбрасываем форму после успешной отправки
    resetForm()

    // Автоматически скрыть сообщение
    setTimeout(() => {
      submitSuccess.value = false
    }, 3000)

    setTimeout(() => {
      emit('success')
    }, 5000)

  } catch (error) {
    console.error('Ошибка отправки формы:', error)

    // Обрабатываем разные типы ошибок
    if (error?.data?.error) {
      submitError.value = error.data.error.message || 'Ошибка при отправке формы'
    } else if (error?.status === 400) {
      submitError.value = 'Неверные данные формы'
    } else if (error?.status === 500) {
      submitError.value = 'Ошибка сервера. Попробуйте позже'
    } else {
      submitError.value = 'Ошибка сети. Проверьте соединение'
    }

    emit('error', error)

    // Автоматически скрыть сообщение об ошибке
    setTimeout(() => {
      submitError.value = ''
    }, 3000)
  } finally {
    isSubmitting.value = false
  }
}
</script>