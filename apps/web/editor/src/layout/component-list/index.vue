<template>
    <el-collapse v-model="activeName">
      <el-collapse-item v-for="collapse in categoryList" :key="collapse.id" :title="collapse.name" :name="collapse.name">
        <div class="component-box">
          <div
            class="component-item"
            v-for="item in componentList.filter((comp) => comp.category.id === collapse.id)"
            :key="item.id"
            draggable="true"
            @dragstart="dragStart($event, item)"
          >
            <img :src="item.path" />
            <span>{{ item.full_name }}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { componentCategory, componentList as list } from '@mk/components'
  
  const activeName = ['基础组件']
  
  // 组件分类
  const categoryList = ref([])
  const getCategoryListFn = () => {
    categoryList.value = componentCategory || []
  }
  getCategoryListFn()
  
  // 组件列表
  const componentList = ref([])
  const getComponentListFn = () => {
    componentList.value = list || []
  }
  getComponentListFn()
  
  // 拖动组件
  const dragStart = (e, item) => {
    const transferData = {
      name: item.name,
      fullName: item.full_name,
    }
    e.dataTransfer.setData('component-drag', JSON.stringify(transferData))
  }
  </script>
  
  <style lang="scss" scoped>
  .el-collapse-item {
    padding-left: 12px;
    :deep(.el-collapse-item__header) {
      font-weight: 600;
    }
  }
  
  .component-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 20px;
    padding-left: 20px;
    .component-item {
      width: 64px;
      height: 86px;
      text-align: center;
      font-size: 0;
      img {
        width: 64px;
        height: 64px;
      }
      span {
        font-family: 'Microsoft YaHei';
        font-size: 13px;
      }
    }
  }
  </style>
  