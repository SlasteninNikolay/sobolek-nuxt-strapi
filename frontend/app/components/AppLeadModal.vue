<script setup lang="ts">
import AppBaseForm from '~/components/base/AppBaseForm.vue'
import AppBaseModal from '~/components/base/AppBaseModal.vue'

const { isOpen, formType, source, close } = useLeadModal()

const onSubmitted = () => {
  setTimeout(() => {
    close()
  }, 3000)
}
</script>

<template>
  <Teleport to="body">
    <app-base-modal :show="isOpen" @close="close" mode="form">
      <template #header>
        <div>{{ formType }}</div>
      </template>
      <template #body>
        <app-base-form @submitted="onSubmitted" :form-type="formType" :source="source" />
      </template>
    </app-base-modal>
  </Teleport>
</template>
