// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    }
  },
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: {enabled: false},
  modules: ['vuetify-nuxt-module', '@pinia/nuxt']
});