const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const {PORT} = require('./config')


const app = new Koa()

// routers
const blog = require('./routes/blog')
app.use(blog.routes(), blog.allowedMethods())

app.use(bodyParser())
app.listen(PORT,()=>console.log(`server is listening in ${PORT}`))