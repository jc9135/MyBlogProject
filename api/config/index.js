let env = 'dev'
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
const secret = 'jiangchao'
module.exports = {
  PORT,
  MYSQL_CONFIG,
  secret
}
