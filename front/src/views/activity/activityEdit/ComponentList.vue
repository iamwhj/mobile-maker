<template>
  <el-collapse v-model="activeName">
    <el-collapse-item title="基础组件" name="basic">
      <div class="component-box">
        <div
          class="component-item"
          v-for="item in componentList"
          :key="item.id"
          draggable="true"
          @dragstart="dragStart($event, item.componentName)"
        >
          <img :src="item.path" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item title="图表组件">
      <div>敬请期待！！！</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
const activeName = ['basic'];

const componentList = [
  {
    id: 0,
    path: require('@/assets/文字.png'),
    componentName: 'Text',
    name: '文字',
  },
  {
    id: 1,
    path: require('@/assets/按钮.png'),
    componentName: 'Button',
    name: '按钮',
  },
  {
    id: 2,
    path: require('@/assets/图片.png'),
    componentName: 'Image',
    name: '图片',
  },
];

const dragStart = (e, name) => {
  e.dataTransfer.setData('component-drag', name);
};
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
