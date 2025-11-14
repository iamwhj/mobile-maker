<template>
  <div class="menu-box">
    <el-menu
      :uniqueOpened="true"
      :default-active="defaultActive"
      :collapse="menuCollapse"
      :router="true"
      class="menu-list"
      background-color="#1c1c1c"
      text-color="#fff"
      active-text-color="#5cacfc"
    >
      <el-menu-item index="appList">
        <el-icon><icon-menu /></el-icon>
        <template #title>应用管理</template>
      </el-menu-item>
      <el-menu-item index="compList">
        <el-icon><document /></el-icon>
        <template #title>组件管理</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNavStore } from '@mk/stores'
import { Menu as IconMenu, Document } from '@element-plus/icons-vue'

const store = useNavStore()
const menuBackgroundColor = '#1c1c1c'
const menuCollapse = computed(() => store.menuCollapse)

const defaultActive = computed(() => {
  const path = window.location.hash.replace('#/', '')
  return path
})
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
