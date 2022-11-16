import { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import { useNuxtApp } from '#app'
//import baseUrl from './baseUrl'
import { ElMessage } from 'element-plus'

// let baseUrl = 'http://localhost:8888'
let baseUrl = ''
// 指定后端返回的基本数据类型
export interface ResponseConfig {
  errorCode: number
  data: any
  message: string
}
const fetch = (url: string, options?: any): Promise<any> => {
  const reqUrl = baseUrl + url
  const nuxtApp = useNuxtApp()
  const cookie = useCookie('token')
  const headers = {
    Authorization: 'Bearer ' + cookie.value
  }
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options, initialCache: false, headers })
      .then(({ data, error }: any) => {
        if (error.value) {
          reject(error.value)
          return
        }
        const value = data.value
        if (!value) {
          // 这里处理错误回调
          // reject(value)
        } else if (value.errorCode === -1) {
          ElMessage({
            message: value.message,
            type: 'error'
          })
        } else if (value.errorCode === 401) {
          // 处理token失效
          ElMessage({
            message: value.message,
            type: 'error'
          })
          nuxtApp.$router.push({
            path: '/login'
          })
        } else {
          resolve(value)
        }
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export default new (class Http {
  get(url: string, params?: any): Promise<any> {
    return fetch(url, {
      method: 'get',
      params: { ...params, _t: new Date().getTime() }
    })
  }

  post(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'post', body })
  }

  put(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'put', body })
  }

  delete(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'delete', body })
  }
})()
