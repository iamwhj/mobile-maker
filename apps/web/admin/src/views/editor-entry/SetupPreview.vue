<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useEditorStore } from '@mk/stores'
import QrcodeVue from 'qrcode.vue'
import Generator from '@mk/generator'
import { deepClone } from '@mk/utils'

const isPreview = defineModel()

const editorStore = useEditorStore()
const appId = computed(() => editorStore.appInfo.appId)
const appData = computed(() => editorStore.application)

let generator = null

onMounted(() => {
  // generator 是移动端环境渲染，使用iframe来做环境隔离渲染
  const iframe = document.querySelector('#previewIframe')
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document

  const div = iframeDoc.createElement('div')
  iframeDoc.body.appendChild(div)

  generator = new Generator()
  generator.setGeneratorEnv(iframe.contentWindow)
  generator.mount(div, { appData: deepClone(appData.value) })
})

onBeforeUnmount(() => {
  generator.unmount()
})

const src = computed(() => {
  return `${import.meta.env.VITE_API_URL}/application/preview/${appId.value}`
})
</script>

<template>
  <div class="preview" @click="isPreview = false">
    <div class="preview-box">
      <div class="model">
        <iframe id="previewIframe" frameborder="0"> </iframe>
      </div>
      <div class="qr-code">
        <QrcodeVue :value="src" :size="200" :margin="1"></QrcodeVue>
        <div class="tips">
          <p>请用手机扫码预览</p>
          <p>能打开网页的应用都可以</p>
          <p>如浏览器，微信等等</p>
        </div>
      </div>
    </div>
  </div>
</template>

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
      background-image: url('../../assets/model.png');
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
