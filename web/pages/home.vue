<template>
  <div class="home-container">
    <div class="top-box">
      <div class="shadow"></div>
      <div class="text">
        <div class="time">
          <FormateDate />
        </div>
        <div class="welcome">欢迎光临</div>
        <div class="typing">你坚持的事情一定会转过头来拥抱你的!</div>
      </div>
      <img src="~~/public/images/img1.jpg" alt="" />
    </div>
    <div class="article-card">
      <div class="card-item" v-for="item in articlelist" :key="item.id">
        <div class="left">
          <div class="time">
            <FormateDate :time="new Date(item.create_time)" />
          </div>
          <div class="title">{{ item.title }}</div>
          <div class="description">{{ item.description }}</div>
        </div>
        <div class="right">
          <img src="~~/public/images/img2.jpg" alt="" srcset="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const articlelist = reactive([
  {
    content: '内容1',
    create_time: 1665121305538,
    description:
      '温柔的晚风 傍晚的晚霞 解暑的西瓜 冒泡的可乐 人间的美好多着呢 不要为眼前的黑暗所迷惑，你要相信自己配得上世间一切的美好。',
    title: '标题3',
    id: 1
  }
])
</script>

<style scoped lang="scss">
.home-container {
  .top-box {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 1;
    .text {
      position: absolute;
      color: #fff;
      font-size: 1rem;
      left: 10%;
      top: 54%;
      transform: translateY(-50%);
      width: 30%;
      .time {
        font-size: 0.875rem;
        margin-bottom: 0.625rem;
      }
      .welcome {
        font-size: 1.375rem;
        margin-bottom: 2.5rem;
      }
      .typing {
        animation: typing 2s steps(15), blink-caret 0.75s step-end infinite;
        overflow: hidden;
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
      height: 18.75rem;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 1;
      .left {
        width: 45%;
        height: 18.125rem;
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
        }
      }
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
