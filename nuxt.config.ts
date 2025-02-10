// https://nuxt.com/docs/api/configuration/nuxt-config
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
    disableTransition: true,
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
    enabled: true,
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
    public: {
      ym: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL
  },
  build: {
    transpile: ['jiti']
  },
  vite: {
    optimizeDeps: {
      include: ['jiti']
    }
  }
});
