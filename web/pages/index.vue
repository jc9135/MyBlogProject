<template>
  <div class="home">
    <div class="main-menu"></div>
    <div class="footer">京ICP备2022030396号</div>
  </div>
</template>

<script setup lang="ts">
import useBlogState from '~~/store'
import { getBlogList } from '~~/utils/api'
const blogState = useBlogState()
onMounted(() => {
  getBlogData()
})

const getBlogData = async () => {
  const res = await getBlogList()
  blogState.updateBlogList(res.data)
}
</script>

<style scoped lang="scss">
@keyframes bgposition {
  0% {
    background-position-x: 0;
  }
  50% {
    background-position-x: 100%;
  }
  100% {
    background-position-x: 0;
  }
}
.home {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  animation: bgposition 15s infinite;
  background: linear-gradient(
    125deg,
    #2980b9,
    #633bd3,
    #8e44ad,
    #192f44,
    #27ae60
  );
  background-size: 800%;
  height: 100vh;
  width: 100%;
  z-index: -99;
  .main-menu {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15.625rem;
    margin-top: -11.25rem;
    width: 31.25rem;
    height: 18.75rem;
    border: 1px solid $bd-color;
  }
  .footer {
    height: 3.125rem;
    line-height: 3.125rem;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0;
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
