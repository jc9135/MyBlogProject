// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // modules: ['@nuxtjs/style-resources'],
  // styleResources: {
  //   scss: ['@/assets/scss/base.scss']
  // },
  css: ['@/assets/scss/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/base.scss";'
        }
      }
    }
  }
})
