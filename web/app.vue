<template>
  <NuxtPage />
</template>
<script lang="ts" setup>
import mousemove from '~~/utils/mousemove'
const mainRef = ref(null)
onMounted(() => {
  const ele = document.body
  mousemove(ele)
})
</script>
<style lang="scss">
.bubble {
  border-radius: 50%;
  position: fixed;
  z-index: 1000000;
}
</style>
