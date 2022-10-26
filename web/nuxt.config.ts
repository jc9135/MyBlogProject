// https://v3.nuxtjs.org/api/configuration/nuxt.config
const lifecycle = process.env.npm_lifecycle_event
export default defineNuxtConfig({
  // modules: ['@nuxtjs/style-resources'],
  // styleResources: {
  //   scss: ['@/assets/scss/base.scss']
  // },
  modules: ['cookie-universal-nuxt'],
  buildModules: ['@pinia/nuxt'],
  css: ['@/assets/scss/global.scss'],
  // build
  build: {
    transpile: lifecycle === 'build' ? ['element-plus'] : []
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/base.scss";'
        }
      }
    },
    server: {
      proxy: {
        '^/api': {
          target: 'http://localhost:8888', //这里是接口地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
