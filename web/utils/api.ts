import Http from '@/utils/request'

export const getBlogList = (params?) => {
  return Http.get('/api/blog/list', params)
}
