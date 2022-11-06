// https://v3.nuxtjs.org/api/configuration/nuxt.config
const lifecycle = process.env.npm_lifecycle_event
export default defineNuxtConfig({
  // modules: ['@nuxtjs/style-resources'],
  // styleResources: {
  //   scss: ['@/assets/scss/base.scss']
  // },
  modules: ['cookie-universal-nuxt'],
  buildModules: ['@pinia/nuxt'],
  // css: ['@/assets/scss/global.scss'],
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
  },
  script: [
    {
      src: 'https://unpkg.com/mermaid/dist/mermaid.min.js'
    }
  ],
  head: {
    title: 'jiangchao',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,user-scalable=0'
      },
      { name: 'referrer', content: 'no-referrer' },
      { hid: 'description', name: 'description', content: '' },
      //在此处添加
      { name: 'referrer', content: 'no-referrer' }
    ]
  }
})
