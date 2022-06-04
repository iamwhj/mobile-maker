<template>
  <div class="activity-edit">
    <div class="button-box">
      <div class="operate-btn">
        <el-button>预览</el-button>
        <el-button>保存</el-button>
        <el-button type="primary">发布</el-button>
      </div>
    </div>
    <div class="activity-assemble">
      <div class="components"></div>
      <div class="mobile">
        <div class="preview-content"></div>
      </div>
      <div class="attribute"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.activity-edit {
  height: calc(100vh - 50px);
  overflow: hidden;
  .button-box {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-top: 4px;
    height: 46px;
    border-bottom: 1px solid rgb(242, 236, 236);
    .operate-btn {
      float: right;
      .el-button {
        margin-right: 12px;
      }
    }
  }
  .activity-assemble {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: calc(100% - 50px);
    .components {
      width: 300px;
      height: 100%;
      background-color: aqua;
    }
    .mobile {
      width: 276px;
      height: 560px;
      background-image: url('@/assets/image/model.png');
      background-repeat: no-repeat;
      background-size: 276px 560px;
      box-sizing: border-box;
      padding: 69px 18px 66px;
      .preview-content {
        height: 100%;
        background-color: rgb(230, 242, 126);
      }
    }
    .attribute {
      width: 300px;
      height: 100%;
      background-color: antiquewhite;
    }
  }
}
</style>
