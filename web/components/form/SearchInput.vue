<template>
  <div class="search-container">
    <el-icon class="search-icon" @click="search"><Search /></el-icon>
    <input
      type="text"
      class="search-input"
      v-model="searchVal"
      @keyup.enter="search"
    />
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import useBlogState from '~~/store'
import { getBlogList } from '~~/utils/api'
const blogState = useBlogState()
const searchVal = ref('')
const search = async () => {
  const res = await getBlogList({
    title: searchVal.value
  })
  blogState.updateBlogList(res.data)
}
</script>

<style scoped lang="scss">
.search-container {
  width: 12.5rem;
  height: 2rem;
  position: relative;
  .search-input {
    position: absolute;
    box-sizing: border-box;
    width: 12.5rem;
    height: 2rem;
    border-radius: 1.25rem;
    padding: 0 0.625rem;
    background: transparent;
    border: 1px solid $input-bd;
    box-shadow: inset 0 0 0 0 transparent;
    &:focus {
      border: 1px solid $input-foucs-bd;
    }
  }
  .search-icon {
    position: absolute;
    z-index: 2;
    right: 0.8rem;
    top: 0.5rem;
  }
}
</style>
