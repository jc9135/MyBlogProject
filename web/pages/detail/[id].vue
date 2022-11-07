<template>
  <div class="detail-container">
    <div class="header">
      <el-icon @click="back"><HomeFilled /></el-icon>
    </div>
    <div class="main-box">
      <div class="title">{{ state.title }}</div>
      <div class="info">
        <FormateDate :time="new Date(state.create_time)" />
      </div>
      <div class="cross-line"></div>
      <div class="content">
        <v-md-preview :text="state.content"></v-md-preview>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
import { getBlogDetail } from '~~/utils/api'
import { ElIcon } from 'element-plus'
import { HomeFilled } from '@element-plus/icons-vue'

// Prism
import Prism from 'prismjs'
// highlight code
import 'prismjs/components/prism-json'

// markdown支持显示代码行数
VMdPreview.use(createLineNumbertPlugin())
// markdown支持代码快速复制
VMdPreview.use(createCopyCodePlugin())
// markdown支持emoji
VMdPreview.use(createEmojiPlugin())
const router = useRouter()
const route = useRoute()

VMdPreview.use(vuepressTheme, {
  Prism
})

const state = reactive({
  content: '',
  describe_text: '',
  tag: '',
  create_time: '',
  title: ''
})
onMounted(() => {
  setTimeout(() => {
    getBlogDetailFuc()
  }, 1)
})
const back = () => {
  router.push({
    path: '/home'
  })
}
const getBlogDetailFuc = async () => {
  let res = await getBlogDetail({ id: route?.params?.id })
  console.log(res)
  if (res.errorCode === 0 && res.data.length != 0) {
    state.tag = res.data[0].tag
    state.describe_text = res.data[0].describe_text
    state.create_time = res.data[0].create_time
    state.content = res.data[0].content
    state.title = res.data[0].title
  }
}
</script>

<style scoped lang="scss">
.detail-container {
  min-height: 100vh;
  box-sizing: border-box;
  .header {
    border-bottom: 0.0625rem solid #eee;
    padding: 1.25rem 1.25rem;
    cursor: pointer;
  }
  .main-box {
    max-width: 50rem;
    margin: auto;
    .title {
      font-size: 1.625rem;
      padding: 4rem 2.5rem 2rem;
      font-weight: 600;
    }
    .info {
      padding: 0 2.5rem;
      color: #6a737d;
      line-height: 22px;
    }
    .cross-line {
      width: 100%;
      margin: 0.625rem 2.5rem 2.5rem;
      box-sizing: border-box;
      height: 1px;
      background-color: #eee;
    }
  }
}
@media screen and (max-width: 900px) {
  .cross-line {
    margin: 0.625rem 0 2.5rem !important;
  }
}
</style>
