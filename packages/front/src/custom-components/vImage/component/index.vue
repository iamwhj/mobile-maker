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
      'https://img0.baidu.com/it/u=2075518181,1224688219&fm=253&fmt=auto&app=138&f=JPEG?w=617&h=449',
  },
})
</script>

<style lang="scss" scoped>
.img-box {
  font-size: 0;
  img {
    vertical-align: middle;
  }
}
</style>
