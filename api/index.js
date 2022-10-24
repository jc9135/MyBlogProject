const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
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

// 404
app.use(async (ctx, next) => {
  await NotFound(ctx)
})

// routers
const blog = require('./routes/blog')
app.use(blog.routes(), blog.allowedMethods())

app.listen(PORT, () => console.log(`server is listening in ${PORT}`))
