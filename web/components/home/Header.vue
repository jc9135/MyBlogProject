<template>
  <div class="header">
    <el-icon @click="back"><HomeFilled /></el-icon>
    <ul class="tab-list">
      <li class="tab-item" v-for="item in TAG_LIST" :key="item">{{ item }}</li>
    </ul>
    <div class="search">
      <SearchInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus'
import { HomeFilled } from '@element-plus/icons-vue'
import SearchInput from '../form/SearchInput.vue'
import { TAG_LIST } from '~~/utils/contants'
const router = useRouter()
const back = () => {
  router.push({
    path: '/home'
  })
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  border-bottom: 1px solid $bd-color;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .tab-list {
    list-style: none;
    display: flex;
    .tab-item {
      padding: 0.3125rem 1.25rem;
      cursor: pointer;
    }
  }
  .search {
  }
}
</style>
