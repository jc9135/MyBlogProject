const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const { PORT } = require('./config')

const app = new Koa()

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)

// routers
const blog = require('./routes/blog')
app.use(blog.routes(), blog.allowedMethods())

app.listen(PORT, () => console.log(`server is listening in ${PORT}`))
