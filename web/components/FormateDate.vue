<template>
  <div>
    {{
      `${
        month[time.getMonth() + 1]
      }   ${time.getDate()} , ${time.getFullYear()}`
    }}
  </div>
</template>

<script setup lang="ts">
const month = reactive({
  1: '一月',
  2: '二月',
  3: '三月',
  4: '四月',
  5: '五月',
  6: '六月',
  7: '七月',
  8: '八月',
  9: '九月',
  10: '十月',
  11: '十一月',
  12: '十二月'
})

defineProps({
  time: {
    type: Date, //类型字符串
    default: new Date()
  }
})
</script>

<style scoped></style>
