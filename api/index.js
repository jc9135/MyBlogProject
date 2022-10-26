const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('koa-cors') // 用于处理跨域
const koaJwt = require('koa-jwt')

const logger = require('./utils/logger')
const { PORT, secret } = require('./config')
const { NotFound } = require('./utils/notFound')
const catchError = require('./utils/catchError')

const app = new Koa()

app.use(
  cors({
    // 指定一个或多个可以跨域的域名
    origin: function (ctx) {
      // 设置允许来自指定域名请求
      logger.info('🚀🚀🚀🚀~~~~~', ctx.url)
      if (ctx.url === '/update-img') {
        return '*' // 允许来自所有域名请求, 这个不管用
      }
      return 'http://localhost:3000' // 这样就能只允许 http://localhost:8000 这个域名的请求了
    },
    maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
    credentials: true, // 是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
  })
)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.body = {
        errorCode: 401,
        message: 'token 失效'
      }
    } else {
      throw err
    }
  })
})

app.use(
  koaJwt({ secret: secret }).unless({
    path: [/^\/user\/login/]
  })
)

// routers
const blog = require('./routes/blog')
const user = require('./routes/user')

app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// 全局错误处理
app.use(catchError)

// 404
app.use(async (ctx, next) => {
  await NotFound(ctx)
})

app.listen(PORT, () => logger.info(`server is listening in ${PORT}`))
