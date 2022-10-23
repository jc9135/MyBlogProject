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
const getBlogDetail = async (id) => {
  let sql = `select * from blogs where state='1' and id='${id}';`
  return await exec(sql)
}
const createBlog = async (params) => {
  let sql = `insert into blogs (title, content, author, create_time) values ('${
    params.title
  }','${params.content}','${params.author}',${new Date().getTime()});`
  return await exec(sql)
}
const updateBlog = async (params) => {
  let sql = `update blogs set title='${params.title}',content='${params.content}',author='${params.author}' where id='${params.id}'`
  return await exec(sql)
}
const deleteBlog = async (id) => {
  let sql = `update blogs set state='0' where id='${id}';`
  return await exec(sql)
}

module.exports = {
  getBlogList,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog
}
