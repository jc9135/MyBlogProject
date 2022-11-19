<template>
  <NuxtPage />
  <el-backtop :right="35" :bottom="40" />
</template>
<script lang="ts" setup>
import { ID_INJECTION_KEY, ElMessage,ElBacktop } from 'element-plus'
import mousemove from '~~/utils/mousemove'
import { login } from '~~/utils/api'
import useBlogState from '~~/store'
const store = useBlogState()
const router = useRouter()
provide(ID_INJECTION_KEY, {
  prefix: 100,
  current: 0
})
// 普通用户自动登录
const loginFun = async () => {
  let res = await login({ username: 'admin', password: 'admin' })
  if (res.errorCode === 0) {
    store.updateToken(res.data.token || '')
  } else {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }
}
onMounted(async () => {
  let theme = 'white'
  if(window.localStorage) {
    theme = window.localStorage.getItem('theme')
  }
  const ele = document.body
  ele.setAttribute('data-theme',theme)
  mousemove(ele)
  loginFun()
})
</script>
<style lang="scss">
.bubble {
  border-radius: 50%;
  position: fixed;
  z-index: 1000000;
}
</style>
