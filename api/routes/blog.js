const router = require('koa-router')()
const {
  getBlogList,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blog')
const { SuccessModel, ErrorModel } = require('../model/responseModel')

router.prefix('/blog')

router.get('/list', async (ctx, next) => {
  const { author, title, tag } = ctx.query
  const blogData = await getBlogList(title, author, tag)
  if (blogData) {
    ctx.body = new SuccessModel(blogData, '获取博客列表成功')
  } else {
    ctx.body = new ErrorModel(null, '获取博客列表失败')
  }
})
router.get('/detail/:id', async (ctx, next) => {
  const params = {
    id: parseInt(ctx.params.id)
  }
  const blogData = await getBlogDetail(params.id)
  if (blogData) {
    ctx.body = new SuccessModel(blogData, '获取博客详情成功')
  } else {
    ctx.body = new ErrorModel(null, '获取博客详情失败')
  }
})
router.post('/create', async (ctx, next) => {
  const params = ctx.request.body
  const blogData = await createBlog(params)
  if (blogData) {
    ctx.body = new SuccessModel(blogData, '创建博客成功')
  } else {
    ctx.body = new ErrorModel(null, '创建博客失败')
  }
})
router.post('/update', async (ctx, next) => {
  const params = ctx.request.body
  const blogData = await updateBlog(params)
  if (blogData) {
    ctx.body = new SuccessModel(blogData, '更新博客成功')
  } else {
    ctx.body = new ErrorModel(null, '更新博客失败')
  }
})
router.get('/delete', async (ctx, next) => {
  const params = ctx.query
  const blogData = await deleteBlog(params.id)
  if (blogData) {
    ctx.body = new SuccessModel(blogData, '删除博客成功')
  } else {
    ctx.body = new ErrorModel(null, '删除博客失败')
  }
})

module.exports = router
