<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const navigation = inject<Ref<NavItem[]>>('navigation')
const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        class="mb-4"
        @click="goBack"
      >
        Назад
      </UButton>
          <UNavigationTree :links="mapContentNavigation(navigation)" />
        </UAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
