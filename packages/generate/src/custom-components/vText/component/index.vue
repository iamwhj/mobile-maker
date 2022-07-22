<template>
  <div class="text-wrap" :style="textStyle">{{ content }}</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  width: { type: String, default: '240px' },
  height: { type: String, default: '20px' },
  content: { type: String, default: '请输入内容' },
  color: { type: String, default: '' },
  fontSize: { type: String, default: '16px' },
});

const textStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
    color: props.color,
    fontSize: props.fontSize,
  };
});
</script>

<style lang="scss" scoped>
.text-wrap {
  text-overflow: clip;
  overflow: hidden;
}
</style>
