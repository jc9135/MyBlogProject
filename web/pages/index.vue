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
            <a href="/home" class="nuxt-linl-a">
              Home
              <span class="Mask"><span>Home</span></span>
              <span class="Mask"><span>Home</span></span>
            </a>
            <!-- <div @click="toPath('/home')" class="nuxt-linl-a">
              Home
              <span class="Mask"><span>Home</span></span>
              <span class="Mask"><span>Home</span></span>
            </div> -->
          </li>
          <li class="Menu-list-item" data-offset="16" onclick>
            <a href="/list" class="nuxt-linl-a">
              Article
              <span class="Mask"><span>Article</span></span>
              <span class="Mask"><span>Article</span></span>
            </a>
            <!-- <div @click="toPath('/list')" class="nuxt-linl-a">
              Article
              <span class="Mask"><span>Article</span></span>
              <span class="Mask"><span>Article</span></span>
            </div> -->
          </li>
        </ul>
      </div>

      <div class="icon-list-item">
        <div class="menu-item">
          <div class="iconfont">&#xe65e;</div>
          <a href="https://github.com/jc9135/MyBlogProject" target="_blank">
            <div>github</div>
          </a>
        </div>
        <div class="menu-item popover">
          <div class="iconfont">&#xe653;</div>
          <div>联系我</div>
          <div class="popover-content">
            <img
              src="/images/qrcode.jpeg"
              alt=""
              srcset=""
              width="150"
              height="150"
            />
          </div>
        </div>
        <div class="menu-item popover">
          <div class="iconfont">&#xe74f;</div>
          <div>邮箱</div>
          <div class="popover-content">explosionzing@126.com</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <a href="https://beian.miit.gov.cn" target="_blank"
        >京ICP备2022030396号</a
      >
      <a
        href="http://www.beian.gov.cn/portal/index.do"
        target="_blank"
        rel="noopener noreferrer"
        >京公网安备11010802040658号</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const toPath = (path) => {
  router.push({ path })
}
</script>

<style scoped lang="scss">
$perspective: 60rem;
$font-size: 4.25rem;
$split-position: 49%;
$split-thickness: 4px;
$split-color: #fff;
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
    .icon-list-item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 3.125rem;
      a {
        color: #fff !important;
      }
      .popover {
        position: relative;
        &:hover {
          .popover-content {
            background-color: #000;
            box-shadow: 0 0 10px #000;
            opacity: 1;
            visibility: visible;
            &::after {
              border-top-color: #000;
            }
          }
        }
        .popover-content {
          background-color: #333;
          border-radius: 5px;
          bottom: 100%;
          color: #fff;
          font-size: 14px;
          left: 50%;
          margin-bottom: 20px;
          opacity: 0;
          padding: 8px;
          position: absolute;
          transform: translate(-50%);
          transition: opacity 0.6s;
          visibility: hidden;
          width: auto;
          &::after {
            border: 10px solid transparent;
            bottom: 0;
            content: '';
            left: 50%;
            position: absolute;
            transform: translate(-50%, 20px);
          }
        }
      }
      .menu-item {
        margin: 0.3125rem;
        cursor: pointer;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        color: #fff;
        .iconfont {
          font-size: 1.25rem;
          line-height: 1.125rem;
          margin-right: 0.1875rem;
          margin-left: 0.625rem;
        }
      }
    }
    .Menu-list-item {
      position: relative;
      color: transparent;
      cursor: pointer;
      .nuxt-linl-a {
        color: transparent;
      }

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
        margin-top: -0.125rem;
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
        color: #ffed22;
        transform: skewX(12deg) translateX(5px);
      }
      .Mask + .Mask {
        transform: skewX(12deg) translateX(-5px);
      }
      &::before {
        transform: scale(1);
        background: linear-gradient(180deg, #ffed22, #ffff60, #ffed22);
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
    font-size: 0.75rem;
    a {
      color: #fff;
      margin: 0 0.3125rem;
    }
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
