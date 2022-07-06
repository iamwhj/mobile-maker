<template>
  <div class="img-box" :style="{ width: width }">
    <img
      src="//gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F22%2F20200722212708_QcV3j.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657354824&t=181dd73b429a021d8b2f03707b32e5c5"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  width: { type: String, default: '240px' },
  height: { type: String, default: 'auto' },
});
</script>

<style lang="scss" scoped>
.img-box {
  font-size: 0;
  img {
    width: 100%;
  }
}
</style>
