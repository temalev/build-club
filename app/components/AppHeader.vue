<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const navigation = inject<NavItem[]>('navigation', [])

const { header } = useAppConfig()
const links = [{
  label: 'Пенопласт',
  to: '/docs'
}, {
  label: 'Раствор цементный',
  to: '/pricing'
}, {
  label: 'Бордюр и поребрик по ГОСТ 6665.',
  to: '/blog'
}]
</script>

<template>
  <UHeader>
    <template #logo>
      <img src="/build_club.png" alt="" width="40" height="40">
    </template>

    <template
      v-if="header?.search"
      #center
    >
      <UContentSearchButton aria-placeholder="Поиск" class="hidden lg:flex" />
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        :label="null"
        class="lg:hidden"
      />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'gray', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
    <template #bottom>
      <UHeaderLinks :links="links" style="display: flex; justify-content: center" />
    </template>
  </UHeader>
</template>