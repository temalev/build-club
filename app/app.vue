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
    lang: 'ru'
  }
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  ogImage: 'https://xn--62-9kcpabdk8ayic5c.xn--p1ai/build_club.png',
  twitterImage: 'https://xn--62-9kcpabdk8ayic5c.xn--p1ai/build_club.png',
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)

const openPdf = () => {
  window.open('/price/price.pdf', '_blank', 'noopener,noreferrer')
}

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
      <h3 class="text-gray-900 text-base font-bold truncate mb-5">Сертификаты</h3>
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
    <div class="floating-action-button" @click="openPdf">
      Прайс
    </div>
  </div>
</template>

<style scoped>
.floating-action-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #e60c0c;
  text-align: center;
  align-content: center;
  font-size: 13px;
  color: #fff;
  opacity: .8;
  cursor: pointer;
  font-weight: 500;
  animation: show .8s forwards;
}

.floating-action-button:hover {
  background-color: #c10a0a;
  box-shadow: 0 5px 20px 5px #00000072;
}

@keyframes show {
  from {
    right: -100px;
    opacity: 0;
  }
  to {
    right: 20px;
    opacity: 0.8;
    box-shadow: 0 5px 20px 5px #0000003a;
  }
}

</style>