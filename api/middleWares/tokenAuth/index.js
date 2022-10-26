const jsonwebtoken = require('jsonwebtoken')
const logger = require('../../utils/logger')
const { secret } = require('../../config')

class JWT {
  generate(value, expires = '7 days') {
    // value 为传入值， expires为过期时间，这两者都会在token字符串中题先
    try {
      return jsonwebtoken.sign(value, secret, { expiresIn: expires })
    } catch (e) {
      logger.error('jwt sign error --->', e)
      return ''
    }
  }

  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret) // 如果过期将返回false
    } catch (e) {
      logger.error('jwt verify error --->', e)
      return false
    }
  }
}

module.exports = JWT
