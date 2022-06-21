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
      <div class="components">
        <ComponentList />
      </div>
      <div class="mobile">
        <ComponentPreview />
        <SideControllBar />
      </div>
      <div class="attribute">
        <ComponentSetting />
      </div>
      <div class="toolsBar">
        <ToolsBar />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import ComponentList from './activityEdit/ComponentList.vue';
import ComponentPreview from './activityEdit/ComponentPreview.vue';
import ComponentSetting from './activityEdit/ComponentSetting.vue';
import SideControllBar from '@/components/sideControllBar';
import ToolsBar from '@/components/toolsBar';
import { openActivityConfig } from '@/commom/helper';

const store = useStore();
// 默认选中顶部栏
openActivityConfig(store);
</script>

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
      // box-shadow: 7px 0px 7px 0px rgb(0 21 41 / 8%);
      border-right: 1px solid #eee;
    }
    .mobile {
      position: relative;
      width: 276px;
      height: 560px;
      background-image: url('@/assets/image/model.png');
      background-repeat: no-repeat;
      background-size: 276px 560px;
      box-sizing: border-box;
      padding: 69px 18px 66px;
    }
    .attribute {
      width: 400px;
      height: 100%;
      border-left: 1px solid #eee;
    }
    .toolsBar {
      position: absolute;
      top: 100px;
      right: 400px;
    }
  }
}
</style>
