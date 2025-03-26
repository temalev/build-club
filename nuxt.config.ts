// https://nuxt.com/docs/api/configuration/nuxt-config
console.log(
  'botToken', process.env.NUXT_BOT_TOKEN,
    'chatId', process.env.NUXT_CHAT_ID
)

export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxthq/studio",
    "nuxt-og-image",
  ],

  extends: ["@nuxt/ui-pro"],

  plugins: ['@/plugins/yandex-metrika.client.js'],

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    "components:extend": (components) => {
      const globals = components.filter((c) =>
        ["UButton", "UIcon"].includes(c.pascalName)
      );

      globals.forEach((c) => (c.global = true));
    },
  },

  colorMode: {
    preference: 'light', // Принудительно включаем светлую тему
    fallback: 'light',   // Запасной вариант
    classSuffix: '',     // Отключаем классы `dark`
  },

  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },

  routeRules: {
    "/api/search.json": { prerender: true },
  },

  devtools: {
    enabled: false,
  },

  typescript: {
    strict: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  compatibilityDate: "2024-07-11",

  runtimeConfig: {
    botToken: process.env.NUXT_BOT_TOKEN,
    chatId: process.env.NUXT_CHAT_ID,
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL
  },
});
