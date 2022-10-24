const NotFound = (ctx) => {
  ctx.body = {
    errorCode: 404,
    message: ctx.url + ' is not found'
  }
}

module.exports = {
  NotFound
}
