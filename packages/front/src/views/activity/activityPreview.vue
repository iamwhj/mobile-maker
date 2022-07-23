<template>
  <div class="preview" @click="emit('hidePreview')">
    <div class="preview-box">
      <div class="model">
        <iframe :src="src" frameborder="0"></iframe>
      </div>
      <div class="qr-code">
        <QrcodeVue :value="src" :size="200" margin="1"></QrcodeVue>
        <div class="tips">
          <p>请用手机扫码预览</p>
          <p>只能打开网页的应用都可以</p>
          <p>如浏览器，微信等等</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import QrcodeVue from 'qrcode.vue';

const props = defineProps(['id']);
const emit = defineEmits(['hidePreview']);

const src = computed(() => {
  return `${process.env.VUE_APP_API_URL}/activity/preview/${props.id}`;
});
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
        background: #f1eaea;
        width: 100%;
        height: 100%;
      }
    }
    .qr-code {
      width: 200px;
      height: 200px;
      background: #fff;
      .tips {
        color: #fff;
        p {
          margin: 5px 0;
        }
      }
    }
  }
}
</style>
