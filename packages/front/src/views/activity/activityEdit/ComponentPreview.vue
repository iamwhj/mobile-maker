<template>
  <div
    class="preview-content"
    @drop.stop.prevent="componentDrap"
    @dragover.prevent
  >
    <ActivtiyConfig></ActivtiyConfig>
    <div
      v-for="component in page.components"
      :key="component.mark"
      :class="{
        'component-container': true,
        checked: component.mark === currentMark,
      }"
      :style="{ 'text-align': component.style.align }"
      @click="switchComponent(component)"
    >
      <component
        :is="component.name"
        :class="component.mark"
        v-bind="{ ...component.detail, ...generateStyle(component.style) }"
        :clickChock="clickChock(component.click)"
      ></component>
    </div>
  </div>
  <el-dialog
    v-model="clickEventDialog"
    :title="clickDialogInfo.title"
    width="260px"
  >
    {{ clickDialogInfo.content }}
    <template #footer>
      <el-button @click="clickEventDialog = false">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { useStore } from 'vuex';
import { getComponentTemplateData } from '@/commom';
import { computed, ref } from 'vue';
import ActivtiyConfig from './activityConfig';
import { selectComponent, generateStyle } from '@/commom/helper';
import { isMobileEnv } from '@/utils';

const store = useStore();
const page = computed(() => store.getters.page);
const currentMark = computed(() => store.getters.currentComponent.mark);

// 拖入组件
const componentDrap = (e) => {
  const data = e.dataTransfer.getData('component-drag');
  const component = JSON.parse(data);
  const componentData = getComponentTemplateData({
    name: component.name,
    fullName: component.fullName,
  });
  // 添加组件
  store.commit('addComponent', componentData);
  // 更新选中组件
  selectComponent(store, {
    name: component.name,
    fullName: component.fullName,
    mark: componentData.mark,
  });
};

// 选中组件
const switchComponent = (component) => {
  selectComponent(store, component);
};

// 点击事件弹窗
const clickEventDialog = ref(false);
const clickDialogInfo = ref({
  title: '默认弹窗',
  content: '默认弹窗内容',
});
// 统一处理点击事件
const clickChock = (click) => {
  // 不是移动端
  if (!isMobileEnv() || !click) return () => false;

  if (click.type === 'link' && click.url) {
    // link
    return () => (window.location.href = click.url);
  } else if (click.type === 'dialog') {
    // dialog
    return () => {
      // 弹窗出现
      clickEventDialog.value = true;
      click.dialogTitle && (clickDialogInfo.value.title = click.dialogTitle);
      click.dialogContent &&
        (clickDialogInfo.value.content = click.dialogContent);
    };
  }
};
</script>

<style lang="scss" scoped>
.preview-content {
  position: relative;
  height: 100%;
  overflow-y: auto;
  // scrollbar-width: none;
  background-color: rgb(241, 234, 234);
  &::-webkit-scrollbar {
    display: none;
  }
  .checked {
    border: 1px dashed #1890ff;
  }

  .component-container {
    overflow: hidden;
  }
}
</style>
