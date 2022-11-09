<template>
  <div class="home-container">
    <div class="top-box">
      <div class="header">
        <el-icon class="icon" @click="toIndex"><Menu /></el-icon>
        <div></div>
      </div>
      <div class="shadow"></div>
      <div class="text">
        <div class="time">
          <FormateDate />
        </div>
        <div class="welcome">
          <div>欢迎光临</div>
          <div class="bounce">
            <span class="letter">请</span>
            <span class="letter">向</span>
            <span class="letter">下</span>
            <span class="letter">滚</span>
            <span class="letter">动</span>
          </div>
        </div>
        <div class="typing" ref="typing"></div>
      </div>
      <img src="/images/img1.jpg" alt="" />
    </div>
    <div class="article-card">
      <div
        class="card-item"
        v-for="(item, index) in state.articlelist"
        :key="item.id"
      >
        <div class="right">
          <img :src="item.cover" alt="" srcset="" />
        </div>
        <div class="left">
          <div class="time">
            <FormateDate :time="new Date(item.create_time)" />
          </div>
          <div class="title" @click="goDetail(item.id)">{{ item.title }}</div>
          <div class="description">{{ item.describe_text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus'
import { Menu } from '@element-plus/icons-vue'
import useBlogState from '~~/store'
import { getBlogList } from '~~/utils/api'
const blogState = useBlogState()
const router = useRouter()
const typing = ref(null)
let state = reactive({
  articlelist: []
})
onMounted(() => {
  setTimeout(() => {
    renderTyping()
    getBlogData()
  }, 1)
})
const renderTyping = () => {
  let str = '你坚持的事情一定会转过头来拥抱你的!'
  let strArr = str.split('')
  let timer,
    i = 0
  timer = setInterval(() => {
    if (i <= strArr.length) {
      typing.value.innerText = strArr.slice(0, i).join('')
      i++
    } else {
      clearInterval(timer)
    }
  }, 150)
}
const goDetail = (id) => {
  router.push({
    path: `/detail/${id}`
  })
}
const toIndex = () => {
  router.push({
    path: '/'
  })
}
const getBlogData = async () => {
  const res = await getBlogList()
  if (res.errorCode === 0) {
    state.articlelist = res.data
    blogState.updateBlogList(res.data)
  }
}
</script>

<style scoped lang="scss">
.home-container {
  .top-box {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 1;
    .header {
      display: flex;
      position: absolute;
      top: 1.5625rem;
      width: 100%;
      color: #fff;
      justify-content: space-between;
      font-size: 1.875rem;
      z-index: 1000;

      .icon {
        margin-left: 1.5625rem;
        cursor: pointer;
      }
    }
    .text {
      position: absolute;
      color: #fff;
      font-size: 1rem;
      left: 10%;
      top: 54%;
      transform: translateY(-50%);
      width: 30%;
      min-width: 16.25rem;
      .time {
        font-size: 0.875rem;
        margin-bottom: 0.625rem;
      }
      .welcome {
        font-size: 1.375rem;
        margin-bottom: 2.5rem;
        display: flex;
        .bounce {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          height: 100%;
          margin-left: 1.5625rem;
          font: normal bold 1rem 'Product Sans', sans-serif;
          white-space: nowrap;
        }

        .letter {
          animation: bounce 0.75s cubic-bezier(0.05, 0, 0.2, 1) infinite
            alternate;
          display: inline-block;
          transform: translate3d(0, 0, 0);
          margin-top: 0.5em;
          text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
          font: normal 500 1rem 'Varela Round', sans-serif;
        }
        .letter:nth-child(1) {
          animation-delay: 0s;
        }
        .letter:nth-child(2) {
          animation-delay: 0.0333333333s;
        }
        .letter:nth-child(3) {
          animation-delay: 0.1333333333s;
        }
        .letter:nth-child(4) {
          animation-delay: 0.2333333333s;
        }
        .letter:nth-child(5) {
          animation-delay: 0.3333333333s;
        }

        @keyframes bounce {
          0% {
            transform: translate3d(0, 0, 0);
            text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
          }
          100% {
            transform: translate3d(0, -1em, 0);
            text-shadow: rgba(255, 255, 255, 0.4) 0 1em 0.35em;
          }
        }
      }
      .typing {
        width: 100%;
        animation: typing 2s steps(15), blink-caret 0.75s step-end infinite;
        overflow: hidden;
        // white-space: nowrap;
        height: 2.8125rem;
      }
      /* 打印效果 */
      @keyframes typing {
        from {
          width: 0;
        }
        to {
          width: 15em;
        }
      }
      /* 光标闪啊闪 */
      @keyframes blink-caret {
        from,
        to {
          box-shadow: 0 0 0 0 transparent;
        }
        50% {
          box-shadow: 0 0 0 0;
        }
      }
    }
    .shadow {
      width: 100vw;
      height: 100vh;
      position: absolute;
      left: -50%;
      transform: skew(20deg, 0);
      background-color: rgb(0, 128, 0, 0.2);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .article-card {
    margin: auto;
    width: 85%;
    padding: 6.25rem 0;
    position: relative;
    &::after {
      background: #eaeaea;
      content: '';
      height: 100%;
      left: 50%;
      position: absolute;
      top: 0;
      transform: translate(-50%);
      width: 1px;
      z-index: 0;
    }
    .card-item {
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 6.25rem;
      z-index: 1;
      &:nth-child(odd) {
        flex-direction: row-reverse;
        .left {
          width: 55%;
        }
        .right {
          width: 45%;
        }
      }
      .left {
        width: 45%;
        height: 16rem;
        box-sizing: border-box;
        padding: 3.125rem 3.75rem 0;
        border: 1px solid $bd-color;
        .time {
          color: #999;
          font-size: 0.75rem;
        }
        .title {
          font-weight: 500;
          margin: 0.5rem 0 0.125rem;
          overflow: hidden;
          word-break: break-all;
          cursor: pointer;
          letter-spacing: 0.2rem;
          font-size: 1.5rem;
          background-image: -webkit-linear-gradient(
            left,
            #147b96,
            #e6d205 25%,
            #147b96 50%,
            #e6d205 75%,
            #147b96
          );
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-background-size: 200% 100%;
          -webkit-animation: maskedAnimation 4s infinite linear;
        }

        @keyframes maskedAnimation {
          0% {
            background-position: 0 0;
          }

          100% {
            background-position: -100% 0;
          }
        }
        .description {
          color: #666;
          font-size: 0.875rem;
          line-height: 1.375rem;
          margin-top: 0.625rem;
        }
      }
      .right {
        width: 55%;
        img {
          width: 100%;
          // max-width: 37.5rem;
        }
      }
    }
  }
}

/* iphone6 7 8 plus */
@media screen and (max-width: 900px) {
  .home-container {
    .article-card {
      width: 100% !important;
      .card-item {
        flex-direction: column !important;
        margin-top: 6.25rem;
        .left {
          background: #fff;
          border: none !important;
          height: auto !important;
          margin: auto !important;
          padding: 1.25rem !important;
          width: 100% !important;
          border-bottom: 1px solid $bd-color !important;
        }
        .right {
          width: 100% !important;
          img {
            max-width: 100% !important;
            width: 100% !important;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
