<template>
<header class="w-full mt-[4rem] xl:mt-0">
  <div class="container">
    <app-menu :menu-data="menuData" />
  </div>
</header>
</template>
<script setup>
const route = useRoute()

const locale = computed(() => {
  return route.query.locale || 'ru'
})

const { menuData, isLoading, error, errorMessage, refresh } = useMenuData(locale)
</script>
