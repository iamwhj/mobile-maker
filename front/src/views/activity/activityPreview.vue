<template>
  <div class="preview" @click="hidePreview">
    <div class="preview-box">
      <div class="model">
        <iframe :src="src" frameborder="0"></iframe>
      </div>
      <div class="qr-code"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['id']);
const emit = defineEmits(['hidePreview']);

const src = computed(() => {
  return 'https://staging-cn.vuejs.org/guide/introduction.html';
});

const hidePreview = () => {
  emit('hidePreview');
};
</script>

<style lang="scss" scoped>
.preview {
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  &-box {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .model {
      width: 276px;
      height: 560px;
      background-image: url('@/assets/image/model.png');
      background-repeat: no-repeat;
      background-size: 276px 560px;
      box-sizing: border-box;
      padding: 69px 18px 66px;
      iframe {
        width: 100%;
        height: 100%;
      }
    }
    .qr-code {
      width: 200px;
      height: 200px;
      background: #fff;
    }
  }
}
</style>
