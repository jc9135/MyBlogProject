const Koa = require('koa')
// const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors') // 用于处理跨域
const koaJwt = require('koa-jwt')
const koaBody = require('koa-body')
const path = require('path')
const fs = require('fs')

const JWT = require('./middleWares/tokenAuth/index')
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
app.use(
  koaBody.koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/upload/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 10 * 1024 * 1024, // 文件上传大小限制
      onFileBegin: (name, file) => {
        // 文件名称保留原始文件名称
        let url = path.join(__dirname, './upload')
        const fileName = file.originalFilename
        file.name = fileName
        file.newFilename = fileName
        // 覆盖文件存放的完整路径(保留原始名称)
        file.path = `/upload/${fileName}`
        file.filepath = `${url}/${fileName}`
      },
      onError: (error) => {
        app.status = 400
        log4js.error(error)
        // 这里可以定义自己的返回内容
        app.body = { code: 400, msg: '上传失败', data: {} }
        return
      }
    }
  })
)
// middlewares
// app.use(
//   bodyparser({
//     enableTypes: ['json', 'form', 'text']
//   })
// )

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(async (ctx, next) => {
  try {
    await next() // next is now a function
  } catch (err) {
    if (401 == err.status) {
      ctx.body = {
        errorCode: 401,
        message: 'token 失效'
      }
    } else {
      throw err
    }
  }
})

app.use(
  koaJwt({ secret: secret }).unless({
    path: [/^\/user\/login/, '/upload/uploadImg']
  })
)
app.use(async (ctx, next) => {
  await next()
  try {
    let authorization = ctx.header.authorization || ''
    let authorizationArr = authorization.split(' ')
    let data = new JWT().verify(authorizationArr[1])
    ctx.body = {
      ...ctx.body,
      admin: data?.admin || false
    }
  } catch (error) {
    ctx.body = {
      ...ctx.body,
      admin: false
    }
  }
})

// routers
const blog = require('./routes/blog')
const user = require('./routes/user')
const uploadImg = require('./routes/uploadImg')

app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(uploadImg.routes(), uploadImg.allowedMethods())

// 全局错误处理
app.use(catchError)

// 404
app.use(async (ctx, next) => {
  await NotFound(ctx)
})
app.listen(PORT, () => {
  console.log(`server listening in ${PORT}`)
})
// module.exports = app
