<template>
  <div>
    <Header />
    <div class="main-container">
      <div class="sidebar-box">
        <slot name="sidebar-content" />
      </div>

      <div class="body-box">
        <slot name="body-content" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~~/components/home/Header.vue'
import Footer from '~~/components/home/Footer.vue'
</script>

<style scoped lang="scss">
.main-container {
  width: 81.25rem;
  margin: 0 auto;
  padding: 0.9375rem 0;
  min-height: calc(100vh - 31.25rem);
  display: flex;
  .body-box {
    width: 65%;
  }
  .sidebar-box {
    width: 30%;
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
</style>
