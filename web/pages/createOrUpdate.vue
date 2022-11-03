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
    <md-editor v-model="content" :htmlPreview="true" />
    <Teleport to="body">
      <el-dialog
        v-model="dialogVisible"
        title="发布文章"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          label-position="top"
          label-width="100px"
          :model="formInline"
          style="max-width: 460px"
          ref="ruleFormRef"
          :rules="rules"
        >
          <el-form-item label="标签" prop="tag">
            <el-select
              v-model="formInline.tag"
              class="m-2"
              placeholder="请选择标签"
              style="width: 100%"
            >
              <el-option
                v-for="item in TAG_LIST"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="describe_text">
            <el-input v-model="formInline.describe_text"></el-input>
          </el-form-item>
          <el-form-item label="上传封面" prop="cover">
            <el-upload
              v-model:file-list="fileList"
              action="/api/upload/uploadImg"
              multiple
              list-type="picture-card"
              :on-success="uploadSuccess"
              :limit="1"
            >
              <!-- <el-button type="primary">Click to upload</el-button> -->
              <el-icon><Plus /></el-icon>

              <template #file="{ file }">
                <div>
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="formInline.cover"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="onSubmit(ruleFormRef)">
              发布
            </el-button>
          </span>
        </template>
      </el-dialog>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElButton,
  ElInput,
  ElMessage,
  ElDialog,
  ElSelect,
  ElOption,
  ElUpload,
  ElIcon,
  genFileId,
  ElMessageBox
} from 'element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import type { UploadFile, UploadUserFile } from 'element-plus'
import MdEditor from 'md-editor-v3'
import { TAG_LIST } from '~~/utils/contants'
import { createBlogItem, updateBlogItem, getBlogDetail } from '~~/utils/api'
import 'md-editor-v3/lib/style.css'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  console.log('onMounted', route?.query?.type)
  if (route?.query?.type === 'update') {
    setTimeout(() => {
      getBlogDetailFuc()
    }, 1)
  }
})

let formInline = reactive({
  tag: '',
  describe_text: '',
  cover: ''
})
const rules = reactive({
  tag: [
    {
      required: true,
      message: '请输入标签',
      trigger: 'change'
    }
  ],
  describe_text: [
    {
      required: true,
      message: '请输入描述',
      trigger: 'change'
    }
  ],
  cover: [
    {
      required: true,
      message: '请上传封面',
      trigger: 'change'
    }
  ]
})
const ruleFormRef = ref(null)
const content = ref('')
const title = ref('')
const submit = () => {
  dialogVisible.value = true
}
const getBlogDetailFuc = async () => {
  let res = await getBlogDetail({ id: route?.query?.id })
  console.log(res)
  if (res.errorCode === 0 && res.data.length != 0) {
    formInline.tag = res.data[0].tag
    formInline.describe_text = res.data[0].describe_text
    formInline.cover = res.data[0].cover
    content.value = res.data[0].content
    title.value = res.data[0].title
    fileList.value = [
      {
        name: res.data[0].cover.split('/')[
          res.data[0].cover.split('/').length - 1
        ],
        url: res.data[0].cover
      }
    ]
  }
}
const onSubmit = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      if (route?.query?.type === 'update') {
        const res = await updateBlogItem({
          title: title.value,
          content: content.value,
          tag: formInline.tag,
          describe_text: formInline.describe_text,
          cover: formInline.cover,
          id: route?.query?.id
        })
        if (res.errorCode === 0) {
          ElMessage({
            message: res.message,
            type: 'success'
          })
          router.push({
            path: '/list'
          })
        }
      } else {
        const res = await createBlogItem({
          title: title.value,
          content: content.value,
          tag: formInline.tag,
          describe_text: formInline.describe_text,
          cover: formInline.cover
        })
        if (res.errorCode === 0) {
          ElMessage({
            message: res.message,
            type: 'success'
          })
          router.push({
            path: '/list'
          })
        }
      }
    }
  })
}
const handleClose = () => {
  dialogVisible.value = false
}
const uploadSuccess = (response: any) => {
  formInline.cover = 'https:/' + response.data.Location
  console.log(fileList.value)
}
const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  fileList.value = []
  formInline.cover = ''
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
