// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "nuxt-tailwindcss4",
    "@pinia/colada-nuxt",
    "@pinia/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  pages: true,
  runtimeConfig: {
    public: {
      apiBase: "http://127.0.0.1:8080",
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
});
