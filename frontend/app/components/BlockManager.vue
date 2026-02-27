<template>
  <div>
    <component
        v-for="(block, index) in blocks"
        :key="getBlockKey(block, index)"
        :is="loadBlockComponent(block.__component)"
        v-bind="getBlockProps(block)"
    />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  blocks: {
    type: Array,
    default: () => []
  }
})

const getBlockKey = (block, index) => {
  return block.id ? `block-${block.id}` : `index-${index}`
}

const getBlockProps = (block) => {
  const { __component, ...rest } = block
  return rest
}

const loadBlockComponent = (componentType) => {
  const componentMap = {
    'page.pervyj-ekran': defineAsyncComponent(() =>
        import('@/components/blocks/HeroBlock.vue')
    ),
    'page.pervyj-ekran-mini': defineAsyncComponent(() =>
        import('@/components/blocks/HeroMiniBlock.vue')
    ),
    'page.info-blok': defineAsyncComponent(() =>
      import('@/components/blocks/InfoBlock.vue')
    ),
    'page.udobstva': defineAsyncComponent(() =>
      import('@/components/blocks/AmenitiesBlock.vue')
    ),
    'page.nomera': defineAsyncComponent(() =>
        import('@/components/blocks/RoomsBlock.vue')
    ),
      'page.blok-s-uslugami': defineAsyncComponent(() =>
      import('@/components/blocks/ServiceBlock.vue')
    ),
    'page.blok-uslugi-setka': defineAsyncComponent(() =>
      import('@/components/blocks/ServicesGridBlock.vue')
    ),
    'page.blok-organizacziya-meropriyatij': defineAsyncComponent(() =>
        import('@/components/blocks/EventsBlock.vue')
    ),
    'page.blok-uchebnye-korpusa': defineAsyncComponent(() =>
        import('~/components/blocks/ActivityBlock.vue')
    ),
    'page.blok-s-kartoj': defineAsyncComponent(() =>
        import('@/components/blocks/MapBlock.vue')
    ),
    'page.blok-obratnaya-svyaz': defineAsyncComponent(() =>
      import('@/components/blocks/FeedbackBlock.vue')
    ),
    'page.blok-kontakty': defineAsyncComponent(() =>
        import('@/components/blocks/ContactsBlock.vue')
    ),
    'page.blok-s-tekstom': defineAsyncComponent(() =>
        import('@/components/blocks/TextBlock.vue')
    ),
  }
  return componentMap[componentType] || null
}
</script>