<template>
  <div class="home">
    <div class="main-menu">
      <div class="menu-top">
        <div class="menu-item">
          <div class="iconfont">&#xe7a7;</div>
          <div>首页</div>
        </div>
        <div class="menu-item">
          <div class="iconfont articel">&#xe6cd;</div>
          <div>文章列表</div>
        </div>
        <div class="menu-item">
          <div class="iconfont">&#xe653;</div>
          <div>公众号</div>
        </div>
        <div class="menu-item">
          <div class="iconfont">&#xe74f;</div>
          <div>邮箱</div>
        </div>
      </div>
    </div>
    <a href="https://beian.miit.gov.cn" target="_blank" class="footer"
      >京ICP备2022030396号</a
    >
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
  .main-menu {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15.625rem;
    margin-top: -11.25rem;
    width: 31.25rem;
    height: 18.75rem;
    display: flex;
    align-items: center;

    .menu-top {
      display: flex;
      justify-content: center;
      width: 100%;
      color: #fff;
      .menu-item {
        margin: 0.3125rem;
        cursor: pointer;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        div {
          display: inline-block;
          height: 100%;
        }
        .iconfont {
          font-size: 1.25rem;
          line-height: 1.125rem;
          margin-right: 0.1875rem;
        }
        .articel {
          font-size: 0.875rem;
        }
      }
    }
  }
  .footer {
    height: 3.125rem;
    line-height: 3.125rem;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0;
    color: #fff;
  }
}
/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
  .home {
    .main-menu {
      width: 18.75rem;
      height: 9.375rem;
      margin-left: -9.375rem;
      margin-top: -6.25rem;
    }
  }
}
</style>
