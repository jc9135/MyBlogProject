module.exports = {
  apps: [
    {
      name: 'nuxtBlogProject',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      watch: true //启动热重载
    }
  ]
}
