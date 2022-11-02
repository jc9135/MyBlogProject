<template>
  <div class="md-editor">
    <div class="editor-top">
      <ElInput
        v-model="title"
        placeholder="输入文章标题..."
        size="large"
        :input-style="{ border: 'none' }"
      />
      <ElButton class="editor-btn" type="primary" @click="submit"
        >编辑完成</ElButton
      >
    </div>
    <md-editor v-model="content" />
  </div>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElButton, ElInput, ElMessage } from 'element-plus'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const content = ref('')
const title = ref('')
const submit = () => {
  console.log(content.value)
}
</script>

<style scoped lang="scss">
.md-editor {
  height: 100vh;
  .editor-top {
    height: 5rem;
    display: flex;
    align-items: center;
    :deep(.el-input__wrapper) {
      box-shadow: none !important;
    }
    .editor-btn {
      margin-right: 0.9375rem;
    }
  }
}
</style>
