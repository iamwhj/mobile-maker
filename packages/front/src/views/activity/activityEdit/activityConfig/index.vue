<template>
  <div class="topStateBar">
    <img src="@/assets/image/topBar.jpg" alt="" />
    <div class="activity-header" @click="openActivityConfig(store)">
      <el-icon><ArrowLeft /></el-icon>
      {{ title }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ArrowLeft } from '@element-plus/icons-vue';
import { openActivityConfig } from '@/commom/helper';

const store = useStore();
const title = computed(() => store.getters.page.detail.title);
</script>

<style lang="scss" scoped>
.topStateBar {
  font-size: 0;
  background: rgb(246, 246, 246);
  img {
    width: 100%;
  }
  .activity-header {
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
