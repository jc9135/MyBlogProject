const logger = require('../utils/logger')
let env = process.env.NODE_ENV
logger.debug('env', env)
const PORT = 8888
let MYSQL_CONFIG = {}
if (env === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '1329135716',
    port: '3306',
    database: 'myblog',
    charset: 'utf8mb4',
    multipleStatements: true
  }
}
if (env === 'production') {
  MYSQL_CONFIG = {
    host: '43.143.211.192',
    user: 'root',
    password: 'Jc1329135716...',
    port: '3306',
    database: 'myblog',
    charset: 'utf8mb4',
    multipleStatements: true
  }
}
const secret = 'jiangchao'
const SECRET_ID = 'AKIDJYirnU1UlofKn3QfgXCf4GH4iIiwwiHD'
const SECRET_KEY = 'sbDmIhy4ugFcnlpmaG2scBXsX1OqunUQ'
module.exports = {
  PORT,
  MYSQL_CONFIG,
  secret,
  SECRET_ID,
  SECRET_KEY
}
