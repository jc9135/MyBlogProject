<template>
  <div class="md-editor">
    <md-editor v-model="text" />
    <ElButton @click="submit">提交</ElButton>
  </div>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElButton, ElInput, ElMessage } from 'element-plus'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
const text = ref('')
const submit = () => {
  console.log(text.value)
}
</script>

<style scoped lang="scss">
.md-editor {
  height: 100vh;
}
</style>
