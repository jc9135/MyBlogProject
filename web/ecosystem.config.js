module.exports = {
  apps: [
    {
      name: 'nuxtBlogProject',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      watch: true, //启动热重载
      env: {
        // 环境参数，当前指定为生产环境 process.env.NODE_ENV
        NODE_ENV: 'production'
      }
    }
  ]
}
