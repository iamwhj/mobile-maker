<template>
  <div class="menu-box">
    <el-menu
      class="menu-list"
      :background-color="menuBackgroundColor"
      :collapse="menuCollapse"
      :router="true"
      default-active="activity"
      text-color="#fff"
      active-text-color="#5cacfc"
    >
      <el-menu-item index="activity">
        <el-icon><icon-menu /></el-icon>
        <template #title>活动管理</template>
      </el-menu-item>
      <el-menu-item index="componentManage">
        <el-icon><document /></el-icon>
        <template #title>组件管理</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { Menu as IconMenu, Document } from '@element-plus/icons-vue'

const props = defineProps(['menuCollapse'])
// menu style
const menuBackgroundColor = '#1c1c1c'
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
