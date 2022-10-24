const format = (ctx) => {
  ctx.body = {
    code: -1,
    message: ctx.method + ' >> ' + ctx.url
  }
}

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    format(ctx)
  }
}