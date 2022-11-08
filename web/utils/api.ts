import Http from '@/utils/request'

export const login = (params?) => {
  return Http.post('/api/user/login', params)
}
export const getBlogList = (params?) => {
  return Http.get('/api/blog/list', params)
}
export const uploadImg = (params?) => {
  return Http.get('/api/upload/uploadImg', params)
}
export const createBlogItem = (params?) => {
  return Http.post('/api/blog/create', params)
}
export const updateBlogItem = (params?) => {
  return Http.post('/api/blog/update', params)
}
export const getBlogDetail = (params?) => {
  return Http.get('/api/blog/detail/' + params.id)
}
export const updateImg = (params?) => {
  return Http.post('/api/upload/uploadImg', params)
}
