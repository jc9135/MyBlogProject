const logger = require('./logger')

const format = (ctx) => {
  ctx.body = {
    errorCode: -1,
    message: ctx.method + ' >> ' + ctx.url
  }
}

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    logger.error(error)
    format(ctx)
  }
}
