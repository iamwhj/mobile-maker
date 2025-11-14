<template>
  <div class="topStateBar">
    <img src="../../../assets/topBar.jpg" alt="" />
    <div class="application-header" @click="selectAppHeader()">
      <el-icon><ArrowLeft /></el-icon>
      {{ title }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEditorStore } from '@mk/stores'
import { ArrowLeft } from '@element-plus/icons-vue'
import { selectAppHeader } from '@mk/editor-helper'

const store = useEditorStore()

const title = computed(() => store.application.detail.title)
</script>

<style lang="scss" scoped>
.topStateBar {
  height: 38px;
  overflow: hidden;
  font-size: 0;
  background: rgb(246, 246, 246);
  img {
    width: 100%;
  }
  .application-header {
    height: 22px;
    line-height: 22px;
    position: relative;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    .el-icon {
      position: absolute;
      left: 4px;
      top: 5px;
    }
  }
}
</style>
