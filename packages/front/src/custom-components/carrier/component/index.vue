<template>
  <div :style="carrierStyle" @drop.stop="componentDrap" @dragover.prevent>
    <span @click="showData">show</span>
    <div v-for="component in components" :key="component.mark">
      <component
        :is="component.name"
        :class="component.mark"
        v-bind="{ 
          ...component.detail, 
          ...generateStyle(component.style), 
        }"
        :clickChock="clickChock(component.click)"
      ></component>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getComponentTemplateData } from '@/common';
import { generateStyle } from '@/common/helper';
import { isMobileEnv } from '@/utils';

const props = defineProps({
  clickChock: { type: Function },
  addComponent: { type: Function },
  width: { type: String, default: '240px' },
  height: { type: String, default: '200px' },
  backgroundColor: { type: String, default: '#EBF29D' },
  components: { type: Array, default: () => [] }
});

const showData = () => {
  console.log(props.components);
}

const carrierStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
    backgroundColor: props.backgroundColor,
  };
});

const componentDrap = (e) => {
  const data = e.dataTransfer.getData('component-drag');
  const component = JSON.parse(data);
  const componentData = getComponentTemplateData({
    name: component.name,
    fullName: component.fullName,
  });
  // 组件数据添加到容器components
  props.addComponent(componentData)
}

// TODO 没想好怎么做，暂时这么放，后面还得抽出去
// 统一处理点击事件
const clickChock = (click) => {
  // 不是移动端
  if (!isMobileEnv() || !click || click.type === 'none') return () => false;

  if (click.type === 'link' && click.url) {
    // link
    return () => (window.location.href = click.url);
  } else if (click.type === 'dialog') {
    // dialog
    return () => {
      // 弹窗出现
      // clickEventDialog.value = true;
      // click.dialogTitle && (clickDialogInfo.value.title = click.dialogTitle);
      // click.dialogContent && (clickDialogInfo.value.content = click.dialogContent);
    };
  }
};
</script>

<style lang="scss" scoped>
  div {
    font-size: 12px;
  }
</style>