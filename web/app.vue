<template>
  <NuxtPage />
  <el-backtop :right="35" :bottom="40" />
</template>
<script lang="ts" setup>
import { ID_INJECTION_KEY, ElMessage, ElBacktop } from 'element-plus'
import mousemove from '~~/utils/mousemove'
import { login, isLogin } from '~~/utils/api'
import useBlogState from '~~/store'
const store = useBlogState()
const router = useRouter()
provide(ID_INJECTION_KEY, {
  prefix: 100,
  current: 0
})
// 普通用户自动登录
const loginFun = async () => {
  await $fetch('/api/user/login', {
    method: 'post',
    body: { username: 'admin', password: 'admin' }
  }).then((res: any) => {
    if (res.errorCode === 0) {
      window.sessionStorage.setItem('isLogin', 'true')
      store.updateToken(res.data.token || '')
    } else {
      ElMessage({
        message: res.message,
        type: 'error'
      })
    }
  })
}
onMounted(async () => {
  let theme = 'white'
  if (window.localStorage) {
    theme = window.localStorage.getItem('theme') || 'white'
  }
  const ele = document.body
  ele.setAttribute('data-theme', theme)
  mousemove(ele)
  const cookie = useCookie('token')
  const headers = {
    Authorization: 'Bearer ' + cookie.value
  }
  if (window.sessionStorage) {
    let isLogin = window.sessionStorage.getItem('isLogin')
    if (isLogin != 'true') {
      await $fetch('/api/user/isLogin', {
        method: 'get',
        headers
      }).then((res: any) => {
        if (res.errorCode === 401) {
          loginFun()
        }
      })
    }
  }
})
</script>
<style lang="scss">
.bubble {
  border-radius: 50%;
  position: fixed;
  z-index: 1000000;
}
</style>
