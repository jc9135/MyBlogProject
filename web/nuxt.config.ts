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
  meta: {
    title: '反方向的钟',
    link: [{ rel: 'icon', href: '/ico.ico' }],
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,user-scalable=0'
      },
      { name: 'referrer', content: 'no-referrer' },
      {
        hid: 'description',
        name: 'description',
        content: '本博客是个人技术内容分享平台。通过技术文章分享来记录成长。'
      },
      //在此处添加
      { name: 'referrer', content: 'no-referrer' },
      { name: 'keyword', content: 'Vue.js,前端面试题,React,Node.js,CI,CD' },
      {
        property: 'og:title',
        content: 'Test title',
        // following template options are identical
        // template: '%s - My page',
        template: (chunk) => `${chunk} - My page`,
        vmid: 'og:title'
      }
    ]
  }
})
