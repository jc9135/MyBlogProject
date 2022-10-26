import Http from '@/utils/request'

export const login = (params?) => {
  return Http.post('/api/user/login', params)
}
export const getBlogList = (params?) => {
  return Http.get('/api/blog/list', params)
}
