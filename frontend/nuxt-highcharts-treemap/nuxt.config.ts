// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  components: true,
  build: {
    transpile: ['@highcharts/vue']
  }
  devtools: { enabled: true }
})

