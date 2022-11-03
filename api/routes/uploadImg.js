const router = require('koa-router')()
const fs = require('fs')
var COS = require('cos-nodejs-sdk-v5')
const path = require('path')
const fse = require('fs-extra')
const { SuccessModel, ErrorModel } = require('../model/responseModel')
const logger = require('../utils/logger')
const { SECRET_KEY, SECRET_ID } = require('../config')

router.prefix('/upload')
function deleteDir(url) {
  var files = []

  if (fs.existsSync(url)) {
    //判断给定的路径是否存在
    files = fs.readdirSync(url) //返回文件和子目录的数组
    files.forEach(function (file, index) {
      var curPath = path.join(url, file)
      if (!fs.statSync(curPath).isDirectory()) {
        fs.unlinkSync(curPath) //是指定文件，则删除
      } else {
        //同步读取文件夹文件，如果是文件夹，则函数回调
        deleteDir(curPath)
      }
    })

    // fs.rmdirSync(url) //清除文件夹
  } else {
    logger.info('给定的路径不存在！')
  }
}
async function upload() {
  return new Promise((resolve, reject) => {
    let url = path.join(__dirname, '../upload')
    // let res = await getFileName(url)
    fs.readdir(url, (err, files) => {
      var cos = new COS({
        SecretId: SECRET_ID,
        SecretKey: SECRET_KEY
      })
      cos.putObject(
        {
          Bucket: 'jiangchaow-1314433594' /* 必须 */,
          Region: 'ap-beijing' /* 必须 */,
          Key: `${files[0]}` /* 必须 */,
          Body: fs.createReadStream(
            path.join(__dirname, `../upload/${files[0]}`)
          ), // 上传文件对象
          onProgress: function (progressData) {
            logger.info(JSON.stringify(progressData))
          }
        },
        function (err, data) {
          logger.info(err || data)
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        }
      )
    })
  })
}
router.post('/uploadImg', async (ctx, next) => {
  let res = await upload()
  if (res.statusCode === 200) {
    ctx.body = new SuccessModel(res, '上传成功')
  } else {
    ctx.body = new ErrorModel('上传失败')
  }
  let url = path.join(__dirname, '../upload')
  deleteDir(url)
})

module.exports = router
