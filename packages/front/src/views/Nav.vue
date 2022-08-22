<template>
  <div class="menu-box">
    <el-menu
      active-text-color="#ffd04b"
      class="menu-list"
      :background-color="menuBackgroundColor"
      :collapse="menuCollapse"
      :router="true"
      default-active="activity"
      text-color="#fff"
    >
      <el-menu-item index="activity">
        <el-icon><icon-menu /></el-icon>
        <span>活动管理</span>
      </el-menu-item>
      <el-menu-item index="component">
        <el-icon><document /></el-icon>
        <span>组件管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { Menu as IconMenu, Document } from '@element-plus/icons-vue';
import { ref } from 'vue';

const props = defineProps(['menuCollapse']);
// menu style
const menuBackgroundColor = '#1c1c1c';
</script>

<style lang="scss" scoped>
.menu-box {
  background-color: v-bind(menuBackgroundColor);
  .menu-list:not(.el-menu--collapse) {
    width: 200px;
  }
  :deep(.el-menu) {
    min-height: 100vh;
  }
}
</style>
