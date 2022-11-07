const router = require('koa-router')()
const fs = require('fs')
const JWT = require('../middleWares/tokenAuth/index')
const { SuccessModel, ErrorModel } = require('../model/responseModel')
const logger = require('../utils/logger')

router.prefix('/user')

router.post('/login', async (ctx, next) => {
  const params = ctx.request.body
  const userInfoStr = await fs.readFileSync('userInfo.json').toString()
  const userInfo = JSON.parse(userInfoStr).userinfo
  let current = userInfo.findIndex((item) => item.username === params.username)
  if (current === -1) {
    ctx.body = new ErrorModel(null, '该用户不存在')
  } else if (params.password !== userInfo[current].password) {
    ctx.body = new ErrorModel(null, '密码错误')
  } else {
    params.admin = params.username === 'jiangchao'
    let token = new JWT().generate(params)
    ctx.cookies.set('token', token, { httpOnly: false })
    ctx.body = new SuccessModel({ token }, '登录成功')
  }
})
router.post('/logout', async (ctx, next) => {
  const params = ctx.request.body
})

module.exports = router
