<script setup>
import AppBaseForm from "~/components/base/AppBaseForm.vue";
import AppBaseModal from "~/components/base/AppBaseModal.vue";

const leadModal = useLeadModal()

const props = defineProps({
  menuData: {
    type: Array,
    default: () => []
  }
});

const config = useRuntimeConfig();
const strapiUrl = config.public.strapiUrl;
const isMobileMenuOpen = ref(false);

const showModal = ref(false)

const showPhoneWidget = ref(false)
const phoneWidgetRef = ref(null)
const phoneButtonRef = ref(null)

const logo = computed(() => {
  if (!props.menuData || !Array.isArray(props.menuData)) return null;

  const item = props.menuData.find(item => item.__component === 'menu.logo');
  if (!item?.logo?.url) return null;

  return {
    url: item.logo.url,
    alt: item.logo.alternativeText || 'Логотип',
    width: item.logo.width || 160,
    height: item.logo.height || 40
  };
});

const openSubMenus = ref([])

const isSubMenuOpen = (menuId) => {
  return openSubMenus.value.includes(menuId)
}

const toggleSubMenu = (menuId) => {
  if (openSubMenus.value.includes(menuId)) {
    openSubMenus.value = openSubMenus.value.filter(id => id !== menuId)
  } else {
    openSubMenus.value.push(menuId)
  }
}

// Функция закрытия мобильного меню при клике на ссылку
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  openSubMenus.value = []
}

const openMobileMenu = () => {
  showPhoneWidget.value = false
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  isMobileMenuOpen.value ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'initial'
}

const isHeaderVisible = ref(true)
const lastScrollPosition = ref(0)
const scrollThreshold = 20
let atTop = ref(true)

const handleNavbarOnScroll = () => {
  showPhoneWidget.value = false
  const currentScrollPosition = window.scrollY
  atTop.value = currentScrollPosition < 54

  if (atTop.value) {
    isHeaderVisible.value = true
    lastScrollPosition.value = currentScrollPosition
    return
  }

  const scrollingDown = currentScrollPosition > lastScrollPosition.value

  if (scrollingDown) {
    isHeaderVisible.value = false
  } else if (lastScrollPosition.value - currentScrollPosition > scrollThreshold) {
    isHeaderVisible.value = true
  }

  lastScrollPosition.value = currentScrollPosition
}

const handleButtonClick = (item, event) => {
  if (item && item.type === 'link') {
    return;
  }

  event.preventDefault();
  showPhoneWidget.value = false
  showModal.value = true
}

const handleBookingClick = (event) => {
  // вместо перехода по ссылке открываем форму "Оставить заявку"
  event?.preventDefault?.()
  closeMobileMenu()
  leadModal.open({ formType: 'Оставить заявку', source: 'header:booking' })
}

function handlePhoneClick() {
  showPhoneWidget.value = false
}

function handlePhoneButtonClick(event) {
  event.preventDefault();
  closeMobileMenu()
  showPhoneWidget.value = !showPhoneWidget.value
}

// Закрываем виджет при клике вне области
const handleClickOutsideWidget = (event) => {
  if (!phoneWidgetRef.value || !phoneButtonRef.value) return

  const clickedOnWidget = phoneWidgetRef.value.contains(event.target)
  const clickedOnButton = phoneButtonRef.value.contains(event.target)

  if (!clickedOnWidget && !clickedOnButton) {
    showPhoneWidget.value = false
  }
}

const onSubmitted = () => {
  setTimeout(() => {
    showModal.value = false
  }, 3000)
}

watch(showPhoneWidget, (isOpen) => {
  if (isOpen) {
    document.addEventListener('click', handleClickOutsideWidget)
  } else {
    document.removeEventListener('click', handleClickOutsideWidget)
  }
})

onMounted(() => {
  window.addEventListener('scroll', throttle(handleNavbarOnScroll, 50))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleNavbarOnScroll)
  document.removeEventListener('click', handleClickOutsideWidget)
})

const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
</script>

<template>
  <nav style="z-index:9999999;"
      v-if="menuData && Array.isArray(menuData) && menuData.length > 0"
      class="fixed px-0 lg:px-0 lg:static mx-auto container h-auto top-0 left-1/2 -translate-x-1/2 lg:transform-none transition-all duration-500 z-50"
      :class="[
      'fixed top-0 w-full transition-all ease-in-out',
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
    ]"
  >
    <div class="mx-auto pt-2 lg:pt-0 mt-1 transition-all rounded-3xl lg:rounded-2xl duration-300 bg-white"
         :class="[atTop ? 'lg:bg-beige' : 'bg-white lg:bg-beige']"
    >
      <!-- Десктопное меню -->
      <div class="container lg:px-0 relative hidden xl:grid grid-cols-[1fr_auto_1fr] items-center py-2 lg:py-0 h-16">
        <!-- Левая часть: Меню -->
        <div class="flex items-center gap-4 xl:gap-8">
          <NuxtLink
              v-for="item in (menuData || []).filter(item => item.__component === 'menu.ssylka')"
              :key="item.id"
              :to="item.url"
              class="text-primary hover:text-secondary-600 font-medium transition-colors uppercase tracking-widest text-xs xl:text-sm font-medium whitespace-nowrap"
          >
            {{ item.title }}
          </NuxtLink>
        </div>

        <!-- Центр: Логотип -->
        <div class="bg-primary px-20 pb-2 pt-2 rounded-b-[2rem] flex justify-center items-center -mt-2 z-10 h-[80px]">
           <NuxtLink
            v-if="logo"
            to="/"
            class="flex flex-col items-center"
        >
          <img
              :src="`${strapiUrl}${logo?.url || ''}`"
              :alt="logo?.alt || 'Логотип'"
              :width="logo?.width || 110"
              :height="logo?.height || 50"
              class="h-12 w-auto"
              loading="lazy"
              decoding="async"
          />
        </NuxtLink>
        </div>

        <!-- Правая часть: Контакты и кнопка -->
        <div class="flex items-center justify-end gap-3 xl:gap-6">
           <a target="_blank" rel="nofollow noopener noindex" href="https://t.me/+73953282287">
            <Icon name="my-icon:telegram" class="w-6 h-6 xl:w-8 xl:h-8 duration-300 hover:scale-110 text-primary" />
          </a>

          <div class="flex flex-col items-end text-xs xl:text-base">
            <a href="tel:+73953282287" class="text-primary font-bold whitespace-nowrap">+7 (3953) 282-287</a>
            <a href="tel:+79526217287" class="text-primary font-bold whitespace-nowrap">+7 (952) 621-72-87</a>
          </div>
          
          <base-app-button
              url=""
              type="outline"
              size="small"
              title="БРОНИРОВАТЬ"
              aria-label="Забронировать"
              class="py-1 px-4 xl:py-2 xl:px-6 border-primary text-primary hover:text-white uppercase tracking-wider text-xs xl:text-sm font-semibold"
              @click="handleBookingClick"
          />
        </div>
      </div>

      <!-- Мобильное меню -->
      <div class="container xl:hidden flex items-center justify-between">
        <div  v-show="showPhoneWidget" class="bg-white w-full h-[4rem] -z-10 absolute top-0 left-0"></div>
        <!-- Логотип -->
        <NuxtLink v-if="logo" to="/">
          <img
              :src="`${strapiUrl}${logo?.url || ''}`"
              :alt="logo?.alt || 'Логотип'"
              :width="logo?.width || 160"
              :height="logo?.height || 40"
              class="h-8 w-auto"
              loading="lazy"
              decoding="async"
          />
        </NuxtLink>
        <div class=" flex items-center gap-4">
          <div class="">
            <a class="flex  justify-center items-center" target="_blank" rel="nofollow noopener noindex" href="https://t.me/+79180715159">
              <Icon name="my-icon:telegram" class="w-[30px] h-[30px] duration-300 hover:scale-110" style="color:var(--color-primary)"/>
            </a>
          </div>

          <!--    Кнопка обратной связи    -->
          <div>
            <a
                ref="phoneButtonRef"
                class="flex items-center justify-center border p-1 border-secondary-600 rounded-full"
                href="tel:+73904250900"
                @click="handlePhoneButtonClick"
            >
              <Icon
                  name="solar:phone-broken"
                  class="text-secondary text-xl transition-colors duration-200"
              />
            </a>

            <!-- Меню обратной связи -->
            <Transition name="fade">
              <div
                  v-show="showPhoneWidget"
                  ref="phoneWidgetRef"
              >
                <div class="bg-primary/80 w-full h-screen z-0 absolute top-[4rem] left-0" @click="showPhoneWidget = false"></div>
                <div

                    class="absolute left-0 top-[4rem] w-screen lg:w-auto lg:p-4 bg-white border border-gray-100"
                >
                  <ul class="flex flex-col lg:p-2 text-nowrap">
                    <li class="flex items-center justify-between p-4 bg-gray-100">
                      <h4 class="text-lg">Телефоны</h4>
                      <span @click="showPhoneWidget = false" class="text-primary cursor-pointer">
                      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </span>
                    </li>
                    <li class="p-4 border-b border-gray-100">
                      <a
                          @click="handlePhoneClick()"
                          href="tel:+73953282287"
                          class="text-primary"
                      >+7 (3953) 282-287</a>
                    </li>
                    <li class="p-4">
                      <base-app-button
                          @click="handleButtonClick(null, $event)"
                          title="Заказать звонок"
                          size="small"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Бургер-кнопка -->
          <button
              @click="openMobileMenu"
              class="rounded-md text-primary focus:outline-none"
          >
            <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
          class="mobile-menu-transition lg:hidden bg-white pb-2 overflow-y-scroll h-auto"
          :class="isMobileMenuOpen ? 'menu-open' : 'menu-closed'"
      >
        <div class="container h-full flex flex-col py-10 items-start justify-evenly">
          <h2 class="text-primary/50">База отдыха Соболек</h2>
          <ul class="space-y-2 pb-14 border-t-1 border-secondary-100">
            <li v-for="item in menuData" :key="item.id">
              <template v-if="item.__component !== 'menu.logo'">
                <!-- Обычная ссылка -->
                <NuxtLink
                    v-if="item.__component === 'menu.ssylka'"
                    :to="item.url"
                    class="block px-0 py-2 text-xl lg:text-2xl font-medium text-primary transition-colors duration-200"
                    @click="closeMobileMenu"
                >
                  {{ item.title }}
                </NuxtLink>

                <!-- Выпадающее меню -->
                <div v-else-if="item.__component === 'menu.vypadayushhee-menyu'">
                  <button
                      @click="toggleSubMenu(item.id)"
                      class="flex items-center justify-between w-full py-2 text-primary transition-colors duration-200"
                  >
                    {{ item.title }}
                    <svg
                        :class="['w-4 h-4 ml-1 transition-transform duration-200', isSubMenuOpen(item.id) ? 'rotate-180' : '']"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  <div
                      class="overflow-hidden transition-all duration-300 ease-in-out"
                      :class="isSubMenuOpen(item.id) ? 'submenu-open' : 'submenu-closed'"
                  >
                    <ul class="pl-4 mt-1 space-y-1">
                      <li v-for="section in item.sections" :key="section.id">
                        <ul class="space-y-1">
                          <li v-for="link in section.links" :key="link.id">
                            <NuxtLink
                                :to="link.url"
                                class="block px-3 py-2 text-lg text-primary-500 hover:bg-primary-50 hover:text-primary-700 rounded transition-colors duration-200"
                                @click="closeMobileMenu"
                            >
                              {{ link.title }}
                            </NuxtLink>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Кнопка -->
<!--                <a-->
<!--                    v-else-if="item.__component === 'menu.knopka'"-->
<!--                    :href="item.url"-->
<!--                    :class="[-->
<!--              `flex items-center gap-1 py-2 rounded transition-colors duration-200`,-->
<!--              item.type === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-primary-500 hover:bg-gray-300'-->
<!--            ]"-->
<!--                >-->
<!--                  <Icon-->
<!--                      name="solar:phone-broken"-->
<!--                      class="text-xl transition-colors duration-200"-->
<!--                      :class="item.type === 'primary' ? 'text-white' : 'text-primary-500 group-hover:text-white'"-->
<!--                  />&nbsp;{{ item.title }}-->
<!--                </a>-->
              </template>
            </li>
          </ul>
          <div class="flex flex-col gap-2">
            <component
                v-for="item in (menuData || []).filter(item => item.__component === 'menu.knopka')"
                :key="item.id"
                :is="item.type === 'link' ? 'a' : 'button'"
                :href="item.type === 'link' ? item.url : undefined"
                type="button"
                class="btn-fill-up relative overflow-hidden inline-flex items-center py-2"
                :class="[
      item.type === 'primary'
        ? 'bg-primary-500 text-white rounded-2xl border border-primary transition-all duration-300 group hover:border-secondary-600'
        : 'bg-transparent text-primary hover:text-primary-300 hover:transition-colors duration-200',
    ]"
                @click="item.type !== 'link' && typeof item.onClick === 'function' ? item.onClick : null"
            >
              <span class="absolute inset-x-0 bottom-0 h-0 bg-secondary-600 transition-all duration-300 group-hover:h-full"></span>
              <Icon
                  name="solar:phone-broken"
                  class="relative me-2 z-10 text-xl transition-colors duration-300"
                  :class="item.type === 'primary' ? 'text-white' : 'text-primary group-hover:text-white'"
              />
              <span class="text-lg relative z-10 transition-colors duration-300 group-hover:text-white">{{ item.title }}</span>
            </component>
            <span class="text-sm text-primary/50">Иркутская область, г. Братск</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <Teleport to="body">
    <app-base-modal
        :show="showModal"
        @close="showModal = false"
        mode="form"
    >
      <template #header>
        <div>Перезвоните мне</div>
      </template>
      <template #body>
        <app-base-form @submitted="onSubmitted" form-type="Перезвоните мне" />
      </template>
    </app-base-modal>
  </Teleport>
</template>

<style>
.my-icon :deep(path) {
  fill: currentColor;
}

.mobile-menu-transition {
  transition-property: max-height, opacity;
  transition-duration: 0.5s;
  max-height: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  overflow: hidden;
}
.menu-open {
  height: 100vh;
  max-height: 1000px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.submenu-open {
  max-height: 500px;
  opacity: 1;
}

.submenu-closed {
  max-height: 0 !important;
  opacity: 0.2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
