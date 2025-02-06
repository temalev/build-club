<script setup lang="ts">
import type { NavItem } from "@nuxt/content";

const navigation = inject<NavItem[]>("navigation", []);

const { header } = useAppConfig();
const links = [
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "О компании",
    to: "/about",
  },
  {
    label: "Каталог",
    to: "/blog",
    children: [
      {
        label: "Плиты перекрытий железобетонные",
        to: "/pro/pricing",
      },
      {
        label: "Фундаментные блоки ФБС",
        to: "/pro/templates",
      },
    ],
  },
];
</script>

<template>
  <UHeader>
    <template #logo>
      <img src="/build_club.png" alt="" width="40" height="40" />
    </template>

    <template v-if="header?.search" #center>
      <div class="hidden lg:block">
        <UHeaderLinks
          :links="mapContentNavigation(navigation)"
          style="display: flex; justify-content: center"
          class="mr-6"
        />
      </div>
      <UContentSearchButton aria-placeholder="Поиск" class="hidden lg:flex" />
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        :label="null"
        class="lg:hidden"
      />

      <UColorModeButton v-if="header?.colorMode" />
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
