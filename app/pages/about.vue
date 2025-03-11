<template>
  <div>
    <!-- <ULandingHero v-if="page.hero" v-bind="page.hero" class="!pb-20 !pt-10">
      <template #title>
        <div class="flex flex-row items-center gap-8 w-full justify-center max-w-5xl mx-auto">
          <img src="/logo.svg" alt="Железобетон62 логотип" class="w-48 h-auto shrink-0" />
          <h1 class="text-left text-6xl font-bold w-full">{{ page.hero.title.replace('{.inline}', '') }}</h1>
        </div>
      </template>
    </ULandingHero> -->

    <ULandingSection v-if="page.contact" :title="page.contact.title" class="pt-5">
      <UContainer>
        <div class="space-y-4">
          <p><strong>Адрес:</strong> {{ page.contact.address }}</p>
          <p>
            <strong>Телефон:</strong> 
            <a 
              :href="'tel:' + page.contact.phone.replace(/[^+\d]/g, '')" 
              class="text-primary-500 hover:underline pl-2"
            >
              {{ page.contact.phone }}
            </a> ,
            <a 
              :href="'tel:' + page.contact.secondPhone.replace(/[^+\d]/g, '')" 
              class="text-primary-500 hover:underline pl-2"
            >
              {{ page.contact.secondPhone }}
            </a>
          </p>
          <p>
            <strong>Email:</strong> 
            <a 
              :href="'mailto:' + page.contact.email"
              class="text-primary-500 hover:underline pl-2"
            >
              {{ page.contact.email }}
            </a>
          </p>
          <p><strong>Режим работы:</strong> {{ page.contact.workingHours }}</p>
        </div>
      </UContainer>
      <UContainer>
        <div class="space-y-4">
          <p><strong>Организация:</strong> {{ page.contact.companyName }}</p>
          <p><strong>ИНН:</strong> {{ page.contact.inn }}</p>
          <p><strong>КПП:</strong> {{ page.contact.kpp }}</p>
          <p><strong>ОГРН:</strong> {{ page.contact.ogrn }}</p>
        </div>
      </UContainer>
    </ULandingSection>
  </div>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData("about", () =>
  queryContent("/about").findOne()
);

useSeoMeta({
  titleTemplate: "",
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});
</script>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  margin-bottom: 4rem;
}

.hero--horizontal {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.features {
  margin-bottom: 4rem;
}

.contact {
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
}
</style>