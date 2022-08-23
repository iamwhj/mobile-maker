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
      'http://81.68.197.70:3301/image/upload_6003934eacc89ca7a49cc0e0b0f2f422.jpg',
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
