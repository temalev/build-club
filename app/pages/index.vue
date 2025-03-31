<script setup lang="ts">
const { data: page } = await useAsyncData("index", () =>
  queryContent("/").findOne()
);

const { data: about } = await useAsyncData("about", () =>
  queryContent("/about").findOne()
);

const navigation = inject<NavItem[]>("navigation", []);

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

      <!-- <UButton to="/price/price.pdf" target="_blank" >Прайс-лист</UButton> -->
      <UPageCard
        title="Прайс-лист"
        description="Актуальные цены на основные позиции"
        icon="material-symbols:currency-ruble"
        to="/price/price.pdf"
        target="_blank"
        variant="soft"
        class="lg:hidden"
      />
    </ULandingHero>

    <ULandingSection :title="page.features.title">
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) of page.features.items"
          :key="index"
          v-bind="item"
        >
          <img :src="item.img" class="w-full rounded-md" />
        </ULandingCard>
      </UPageGrid>
    </ULandingSection>
    <ULandingSection
      :title="about.features.title"
      :links="page.features.links"
      class="!pt-0 mt-20"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) of about.features.items"
          :key="index"
          v-bind="item"
        >
        </ULandingCard>
      </UPageGrid>
    </ULandingSection>
  </div>
</template>
