const router = require('koa-router')()
const { getBlogList } = require('../controllers/blog')
const { SuccessModel, ErrorModel } = require('../model/responseModel')

router.prefix('/blog')

router.get('/list', async (ctx, next) => {
  const { author, title } = ctx.query
  const blogData = await getBlogList(title, author)
  if (blogData) {
    ctx.body = new SuccessModel(blogData, '获取博客列表成功')
  } else {
    ctx.body = new ErrorModel(null, '获取博客列表失败')
  }
})

module.exports = router
