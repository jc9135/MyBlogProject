const Koa = require('koa')
const router = require('koa-router')()
const {PORT} = require('./config')


const app = new Koa()

app.use(router.routes())
app.listen(PORT,()=>`server is listening in ${PORT}`)