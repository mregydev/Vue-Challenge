// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Frontend Coding Challenge',
    },
  },
  nitro: {
    storage: {
      storage: {
        driver: 'fs',
        base: './storage',
      },
    },
  },
});
