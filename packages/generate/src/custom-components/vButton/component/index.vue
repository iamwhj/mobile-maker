<template>
  <button class="btn-box" :style="btnStyle" @click="clickChock">
    {{ content }}
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  clickChock: { type: Function },
  width: { type: String, default: '240px' },
  height: { type: String, default: '28px' },
  color: { type: String, default: '#fff' },
  backgroundColor: { type: String, default: '#409EFF' },
  borderRadius: { type: String, default: '4px' },
  content: { type: String, default: '按钮' },
});

const btnStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
    color: props.color,
    backgroundColor: props.backgroundColor,
    borderRadius: props.borderRadius,
  };
});
</script>

<style lang="scss" scoped>
.btn-box {
  text-align: center;
  line-height: v-bind(height);
  border: none;
}
</style>
