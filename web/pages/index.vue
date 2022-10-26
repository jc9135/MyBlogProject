<template>
  <NuxtLayout name="default">
    <template #body-content>
      <ul class="detail-container">
        <li
          class="detail-item"
          v-for="item in blogState.blogList"
          :key="item.id"
        >
          {{ item.title }}
        </li>
      </ul>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import useBlogState from '~~/store'
import { getBlogList } from '~~/utils/api'
const blogState = useBlogState()
onMounted(() => {
  getBlogData()
})

const getBlogData = async () => {
  console.log('useCookie', useCookie('token').value)
  const res = await getBlogList()
  blogState.updateBlogList(res.data)
}
</script>

<style scoped lang="scss">
.detail-container {
  margin: 0 auto;
  overflow: hidden;
  .detail-item {
    float: left;
    width: 30%;
    margin: 0.3125rem;
    height: 5rem;
    line-height: 5rem;
    box-sizing: border-box;
    border: 1px solid $bd-color;
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
