<template>
  <NuxtPage />
</template>
<script lang="ts" setup>
import { ID_INJECTION_KEY } from 'element-plus'
import mousemove from '~~/utils/mousemove'
provide(ID_INJECTION_KEY, {
  prefix: 100,
  current: 0
})
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
