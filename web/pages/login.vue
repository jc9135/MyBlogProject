<template>
  <div class="route">
    <div class="routeMain">
      <el-form
        label-position="top"
        label-width="100px"
        :model="formInline"
        style="max-width: 460px"
        ref="ruleFormRef"
        :rules="rules"
        @keyup.enter="onSubmit(ruleFormRef)"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="密   码" prop="password">
          <el-input
            type="password"
            show-password
            v-model="formInline.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="loginButton"
            @click="onSubmit(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElButton, ElInput, ElMessage } from 'element-plus'
import { login } from '~~/utils/api'
import useBlogState from '~~/store'
const store = useBlogState()
const router = useRouter()
const ruleFormRef = ref()
const formInline = reactive({
  username: '',
  password: ''
})
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})
const onSubmit = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let res = await login(formInline)
      console.log(res)
      if (res.errorCode === 0) {
        store.updateToken(res.data.token || '')
        router.push({
          path: '/'
        })
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
    }
  })
}
</script>
<style lang="scss" scoped>
.route {
  width: 100%;
  height: 100vh;
  .routeMain {
    width: 500px;
    height: 350px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 2px 6px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    top: 50%;
    transform: translateY(-70%);
    padding: 55px 20px 20px 20px;
    box-sizing: border-box;
    .loginButton {
      width: 100%;
      margin-top: 15px;
    }
  }
}
</style>
