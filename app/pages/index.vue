<script setup lang="ts">
const { data: page } = await useAsyncData("index", () =>
  queryContent("/").findOne()
);

useSeoMeta({
  titleTemplate: "",
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <template #title>
        <MDC :value="page.hero.title" />
      </template>

      <img src="/build_club_banner.png" alt="" height="200" />
    </ULandingHero>

    <ULandingSection :title="page.features.title" :links="page.features.links">
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) of page.features.items"
          :key="index"
          v-bind="item"
        >
          <img
            :src="item.img"
            class="w-full rounded-md"
          />
        </ULandingCard>
      </UPageGrid>
    </ULandingSection>
  </div>
</template>
