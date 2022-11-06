module.exports = {
  apps: [
    {
      name: 'blogApiProject',
      exec_mode: 'cluster',
      instances: 'max',
      script: './index.js',
      watch: true //启动热重载
    }
  ]
}
