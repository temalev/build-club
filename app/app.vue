<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

const { seo } = useAppConfig()

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
  default: () => [],
  server: false
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  ogImage: 'https://docs-template.nuxt.dev/social-card.png',
  twitterImage: 'https://docs-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)

console.log(files);

</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />
    <div class="flex flex-col items-center mb-10">
      <h3 class="text-gray-900 dark:text-white text-base font-bold truncate mb-5">Сертификаты</h3>
      <img class="rounded-lg" src="public/certificates/cert.webp" width="600px" alt="">
    </div>  

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        label="Поиск"
        placeholder="Поиск..."
      />
    </ClientOnly>

    <UNotifications />
  </div>
</template>
