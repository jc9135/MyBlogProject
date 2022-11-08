<template>
  <div>
    <Header />
    <div class="main-container">
      <div class="sidebar-box">
        <slot name="sidebar-content" />
      </div>

      <div class="body-box">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElIcon, ElMessage } from 'element-plus'
import { Delete, Edit } from '@element-plus/icons-vue'
import Header from '~~/components/home/Header.vue'
import useBlogState from '~~/store'
import { getBlogList } from '~~/utils/api'
const blogState = useBlogState()
const router = useRouter()
const isAdmin = ref(false)
onMounted(() => {
  setTimeout(() => {
    getBlogData()
  }, 1)
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
.main-container {
  max-width: 50rem;
  margin: auto;
  padding: 0.9375rem 0;
  min-height: calc(100vh - 31.25rem);
  display: flex;
  .body-box {
    width: 100%;

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
  }
  .sidebar-box {
    width: 0;
  }
}

/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
  .main-container {
    width: 100%;
    padding: 0.9375rem;
    .sidebar-box {
      display: none;
    }
    .body-box {
      width: 100%;
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
