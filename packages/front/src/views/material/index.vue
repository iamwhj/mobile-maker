<template>
  <el-tabs class="tabs-wrap">
    <el-tab-pane label="组件列表"><ComponentList /></el-tab-pane>
    <el-tab-pane label="分类列表"><CategoryList /></el-tab-pane>
  </el-tabs>
</template>

<script setup>
import ComponentList from './componentList';
import CategoryList from './categoryList';
</script>

<style lang="scss" scoped>
.tabs-wrap {
  padding: 12px;
}
</style>
