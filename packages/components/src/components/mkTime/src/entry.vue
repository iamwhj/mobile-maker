<script setup>
import { computed, ref, watch } from 'vue'
import config from '../config'

defineOptions({
  name: config.name,
})

const props = defineProps({
  clickChock: { type: Function },
  width: { type: String, default: '240px' },
  height: { type: String, default: '28px' },
  time: { type: String, default: '60s' },
})

const timeStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
  }
})

const timeVal = ref(parseInt(props.time))

// 计时器
let timer = null
const countDown = () => {
  if (timeVal.value <= 0) clearInterval(timer)
  else timeVal.value -= 1
}
timer = setInterval(countDown, 1000)

watch(
  () => props.time,
  (val) => {
    clearInterval(timer)
    timeVal.value = parseInt(val)
    timer = setInterval(countDown, 1000)
  }
)
</script>

<template>
  <div class="time" :style="timeStyle" @click="clickChock">{{ timeVal }}</div>
</template>

<style lang="scss" scoped>
.time {
  font-size: 20px;
  color: #000;
}
</style>
