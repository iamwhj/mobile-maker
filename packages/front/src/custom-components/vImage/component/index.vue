<template>
  <div class="img-box" :style="{ width: width, height: height }">
    <img :src="src" :style="{ width: width, height: height }" />
  </div>
</template>

<script setup>
const props = defineProps({
  width: { type: String, default: '240px' },
  height: { type: String, default: 'auto' },
  src: { type: String, default: 'https://s1.ax1x.com/2022/07/19/j7EdyR.jpg' },
});
</script>

<style lang="scss" scoped>
.img-box {
  font-size: 0;
  img {
    vertical-align: middle;
  }
}
</style>
