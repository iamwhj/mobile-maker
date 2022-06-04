<template>
  <el-collapse>
    <el-collapse-item title="基础组件">
      <div class="component-box">
        <div class="component-item">
          <img src="@/assets/文字.png" />
          <span>文字</span>
        </div>
        <div class="component-item">
          <img src="@/assets/按钮.png" />
          <span>按钮</span>
        </div>
        <div class="component-item">
          <img src="@/assets/图片.png" />
          <span>图片</span>
        </div>
        <div class="component-item">
          <img src="@/assets/文字.png" />
          <span>文字</span>
        </div>
        <div class="component-item">
          <img src="@/assets/文字.png" />
          <span>文字</span>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item title="图表组件">
      <div>敬请期待！！！</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup></script>

<style lang="scss" scoped>
.el-collapse-item {
  padding-left: 12px;
  ::v-deep .el-collapse-item__header {
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
