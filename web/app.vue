<template>
  <div ref="mainRef" class="main-dom">
    <NuxtPage />
  </div>
</template>
<script lang="ts" setup>
import mousemove from '~~/utils/mousemove'
const mainRef = ref(null)
onMounted(() => {
  mousemove(mainRef.value)
})
</script>
<style lang="scss">
.main-dom {
  position: relative;
  .bubble {
    border-radius: 50%;
    position: absolute;
  }
}
</style>
