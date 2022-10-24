const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const logger = require('./utils/logger')

const { PORT } = require('./config')
const { NotFound } = require('./utils/notFound')
const catchError = require('./utils/catchError')

const app = new Koa()

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)

// 全局错误处理
app.use(catchError)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routers
const blog = require('./routes/blog')
app.use(blog.routes(), blog.allowedMethods())

// 404
app.use(async (ctx, next) => {
  await NotFound(ctx)
})

app.listen(PORT, () => console.log(`server is listening in ${PORT}`))
