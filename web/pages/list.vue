<template>
  <NuxtLayout name="default">
    <template #body-content>
      <ul class="detail-container">
        <li
          class="detail-item"
          v-for="item in blogState.blogList"
          :key="item.id"
        >
          <div @click="goDetail(item.id)">{{ item.title }}</div>
          <div class="icon-container">
            <template v-if="isAdmin">
              <el-icon class="edit-icon" @click="toEdit(item.id)"
                ><Edit
              /></el-icon>
              <el-icon><Delete /></el-icon
            ></template>
          </div>
        </li>
      </ul>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ElIcon, ElMessage } from 'element-plus'
import { Delete, Edit } from '@element-plus/icons-vue'
import useBlogState from '~~/store'
import { getBlogList } from '~~/utils/api'
const blogState = useBlogState()
const router = useRouter()
const isAdmin = ref(false)
onMounted(() => {
  getBlogData()
})
const toEdit = (id) => {
  router.push({
    path: `/createOrUpdate`,
    query: {
      type: 'update',
      id
    }
  })
}
const goDetail = (id) => {
  router.push({
    path: `/detail/${id}`
  })
}
const getBlogData = async () => {
  const res = await getBlogList()
  if (res.errorCode === 0) {
    isAdmin.value = res.admin
    blogState.updateBlogList(res.data)
  } else {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }
}
</script>

<style scoped lang="scss">
.detail-container {
  margin: 0 auto;
  overflow: hidden;
  .detail-item {
    float: left;
    width: 100%;
    margin: 0.3125rem;
    padding: 0 0.625rem;
    height: 5rem;
    line-height: 5rem;
    box-sizing: border-box;
    border-bottom: 1px solid $bd-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .edit-icon {
      margin: 0 0.625rem;
    }
  }
}
/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
  .detail-container {
    .detail-item {
      width: 96%;
    }
  }
}
</style>
