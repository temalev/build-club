<script setup lang="ts">
import { withoutTrailingSlash } from "ufo";

definePageMeta({
  layout: "docs",
});

const route = useRoute();
const { toc, seo } = useAppConfig();
const slug = route.params.slug[1]
const imagesPath = `/images/products/${slug}/`


const { data: page } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryContent()
    .where({ _extension: "md", navigation: { $ne: false } })
    .only(["title", "description", "_path"])
    .findSurround(withoutTrailingSlash(route.path))
);

useSeoMeta({
  title: page.value.title,
  ogTitle: `${page.value.title} - ${seo?.siteName}`,
  description: page.value.description,
  ogDescription: page.value.description,
});

defineOgImageComponent("Docs");

console.log(page.value.title);


const headline = page.value.title

const links = computed(() =>
  [
    toc?.bottom?.edit && {
      icon: "i-heroicons-pencil-square",
      label: "Edit this page",
      to: `${toc.bottom.edit}/${page?.value?._file}`,
      target: "_blank",
    },
    ...(toc?.bottom?.links || []),
  ].filter(Boolean)
);

const { data: images } = await useFetch(`/api/images/${slug}`)

const productImages = computed(() => {
  if (!images.value) return []
  return images.value.map(image => `${imagesPath}${image}`)
})
</script>

<template>
  <UPage>
    <div class="mb-6 mt-6">
      <h1 class="text-3xl font-bold">{{ page.title }}</h1>
      <p v-if="page.description" class="mt-2 text-gray-500">{{ page.description }}</p>
      <div v-if="page.links" class="mt-4 flex gap-4">
        <a 
          v-for="link in page.links" 
          :key="link.to"
          :href="link.to"
          :target="link.target"
          class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600"
        >
          <i v-if="link.icon" :class="link.icon"></i>
          {{ link.label }}
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(image, index) in productImages" :key="index" class="aspect-square">
        <img 
          :src="image" 
          :alt="`${page.title} - изображение ${index + 1}`"
          class="w-full h-full object-cover rounded-lg"
        >
      </div>
    </div>
    
    <UPageBody prose>
      <ContentRenderer v-if="page.body" :value="page" />

      <hr v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template v-if="page.toc !== false" #right>
      <UContentToc :title="toc?.title" :links="page.body?.toc?.links">
        <template v-if="toc?.bottom" #bottom>
          <div
            class="hidden lg:block space-y-6"
            :class="{ '!mt-6': page.body?.toc?.links?.length }"
          >
            <UDivider v-if="page.body?.toc?.links?.length" type="dashed" />

            <UPageLinks :title="toc.bottom.title" :links="links" />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
