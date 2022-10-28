<template>
  <div class="home">
    <div class="main-menu">
      <!-- <div class="menu-top">
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
      </div> -->
      <div class="Menu">
        <ul class="Menu-list" data-offset="10">
          <li class="Menu-list-item" data-offset="20" onclick>
            Home
            <span class="Mask"><span>Home</span></span>
            <span class="Mask"><span>Home</span></span>
          </li>
          <li class="Menu-list-item" data-offset="16" onclick>
            About
            <span class="Mask"><span>About</span></span>
            <span class="Mask"><span>About</span></span>
          </li>
          <li class="Menu-list-item" data-offset="12" onclick>
            Work
            <span class="Mask"><span>Work</span></span>
            <span class="Mask"><span>Work</span></span>
          </li>
          <li class="Menu-list-item" data-offset="8" onclick>
            Contact
            <span class="Mask"><span>Contact</span></span>
            <span class="Mask"><span>Contact</span></span>
          </li>
        </ul>
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
$perspective: 60rem;
$font-size: 4.25rem;
$split-position: 49%;
$split-thickness: 4px;
$split-color: #ff2c75;
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
    justify-content: center;

    // === Menu <ul> =====
    .Menu-list {
      font-size: $font-size;
      line-height: 1.2;
      text-transform: uppercase;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: rotateX(-10deg) rotateY(20deg); // overwritten by JS
    }

    // === Menu item =====
    .Menu-list-item {
      position: relative;
      color: transparent;
      cursor: pointer;

      // === Split Line =====
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: $split-position;
        left: -10%;
        right: -10%;
        height: $split-thickness;
        border-radius: $split-thickness;
        margin-top: -($split-thickness / 2);
        background: $split-color;
        transform: scale(0);
        transition: transform 0.8s cubic-bezier(0.16, 1.08, 0.38, 0.98);
        z-index: 1;
      }
    }

    // === Top/bottom mask =====
    .Mask {
      display: block;
      position: absolute;
      overflow: hidden;
      color: $split-color;
      top: 0;
      height: $split-position;
      transition: all 0.8s cubic-bezier(0.16, 1.08, 0.38, 0.98);

      span {
        display: block;
      }
    }

    // === Bottom mask specific =====
    .Mask + .Mask {
      top: $split-position - 0.1;
      height: 100 - $split-position + 0.1;

      span {
        transform: translateY(-$split-position);
      }
    }

    // === Where the fun stuff happens =====
    .Menu-list-item:hover,
    .Menu-list-item:active {
      .Mask {
        color: #fff;
        transform: skewX(12deg) translateX(5px);
      }
      .Mask + .Mask {
        transform: skewX(12deg) translateX(-5px);
      }
      &::before {
        transform: scale(1);
      }
    }
    // .menu-top {
    //   display: flex;
    //   justify-content: center;
    //   width: 100%;
    //   color: #fff;
    //   .menu-item {
    //     margin: 0.3125rem;
    //     cursor: pointer;
    //     font-size: 0.875rem;
    //     display: flex;
    //     align-items: center;
    //     div {
    //       display: inline-block;
    //       height: 100%;
    //     }
    //     .iconfont {
    //       font-size: 1.25rem;
    //       line-height: 1.125rem;
    //       margin-right: 0.1875rem;
    //     }
    //     .articel {
    //       font-size: 0.875rem;
    //     }
    //   }
    // }
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
