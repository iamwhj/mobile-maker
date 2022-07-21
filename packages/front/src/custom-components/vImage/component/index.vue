<template>
  <div
    class="img-box"
    :style="{ width: width, height: height }"
    @click="clickChock"
  >
    <img :src="src" :style="{ width: width, height: height }" />
  </div>
</template>

<script setup>
const props = defineProps({
  clickChock: { type: Function },
  width: { type: String, default: '240px' },
  height: { type: String, default: 'auto' },
  src: {
    type: String,
    default:
      'http://121.37.148.236:3301/image/upload_2975dc2b0e680c1e425fc9f461186eb7.jpg',
  },
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
