const { exec, escape } = require('../utils/mysql')

const getBlogList = async (title, author) => {
  let sql = `select * from blogs where state='1'`
  if (author) {
    sql += ` and author='${author}'`
  }
  if (title) {
    sql += ` and title like '%${title}%'`
  }
  sql += ';'
  return await exec(sql)
}

module.exports = {
  getBlogList
}
