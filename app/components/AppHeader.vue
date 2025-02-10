<script setup lang="ts">
import type { NavItem } from "@nuxt/content";

const navigation = inject<NavItem[]>("navigation", []);

const { header } = useAppConfig();

</script>

<template>
  <UHeader>
    <template #logo>
      <img src="/logo.svg" alt="" width="50" height="50" />
    </template>

    <template v-if="header?.search" #center>
      <div class="hidden lg:block">
        <UHeaderLinks
          :links="mapContentNavigation(navigation)"
          style="display: flex; justify-content: center"
          class="mr-6"
        />
      </div>
      <UContentSearchButton placeholder="Поиск" label="Поиск" class="hidden lg:flex" />
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        class="lg:hidden"
        :label="null"
      />

      <!-- <UColorModeButton v-if="header?.colorMode" /> -->
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
    <!-- <template #bottom>
      <UHeaderLinks
        :links="mapContentNavigation(navigation)"
        style="display: flex; justify-content: center"
      />
    </template> -->
  </UHeader>
</template>
