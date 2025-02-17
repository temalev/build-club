<script setup lang="ts">
import type { NavItem } from "@nuxt/content";

const navigation = inject<NavItem[]>("navigation", []);

const { header } = useAppConfig();

const { data: page } = await useAsyncData("about", () =>
  queryContent("/about").findOne()
);
</script>

<template>
  <UHeader>
    <template #logo>
      <img src="/logo.svg" alt="logo" width="50" height="50" />
    </template>

    <template v-if="header?.search" #center>
      <div class="hidden lg:block">
        <UHeaderLinks
          :links="mapContentNavigation(navigation)"
          style="display: flex; justify-content: center"
          class="mr-6"
        />
      </div>
      <UContentSearchButton
        placeholder="Поиск"
        label="Поиск"
        class="hidden lg:flex"
      />
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        class="lg:hidden"
        :label="null"
      />

      <!-- <UColorModeButton v-if="header?.colorMode" /> -->
      <div class="hidden lg:flex flex-col">
        <a
          :href="'tel:' + page.contact.phone.replace(/[^+\d]/g, '')"
          class="text-primary-500 hover:underline pl-2 whitespace-nowrap"
        >
          {{ page.contact.phone }}
        </a>
        <a
          :href="'mailto:' + page.contact.email"
          class="text-primary-500 hover:underline pl-2"
        >
          {{ page.contact.email }}
        </a>
      </div>

      <div class="lg:hidden flex gap-3 mr-2" style="height: 20px;">
        <a
          :href="'tel:' + page.contact.phone.replace(/[^+\d]/g, '')"
          aria-label="Позвонить"
          style="height: 20px;"
        >
          <UIcon name="i-heroicons-phone" class="w-5 h-5" />
        </a>
        <a
          :href="'mailto:' + page.contact.email"
          aria-label="Написать email"
          style="height: 20px;"
        >
          <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
        </a>
      </div>
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
