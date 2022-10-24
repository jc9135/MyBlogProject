<template>
  <div>
    <Header />
    <div class="body-box">
      <slot name="body-content" />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~~/components/home/Header.vue'
import Footer from '../components/home/Footer.vue'
</script>

<style scoped lang="scss"></style>
