<template>
  <div class="carrier" :style="carrierStyle" @drop.stop="componentDrap" @dragover.prevent>
    <!-- TODO 自由画布 从这个div下手，需要有个外层div包裹组件进行绝对定位 -->
    <div v-for="component in components" :key="component.mark">
      <component
        :is="component.name"
        :class="component.mark"
        v-bind="{ 
          ...component.detail, 
          ...generateStyle(component.style), 
        }"
        :clickChock="(component) => clickChock(component.click)"
      ></component>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getComponentTemplateData } from '@/common';
import { generateStyle } from '@/common/helper';

const props = defineProps({
  clickChock: { type: Function, default: () => {} },
  addComponent: { type: Function },
  components: { type: Array, default: () => [] },
  width: { type: String, default: '240px' },
  height: { type: String, default: '200px' },
  type: { type: String, default: 'free' },
  backgroundColor: { type: String, default: '#EBF29D' },
});

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

</script>

<style lang="scss" scoped>
  .carrier {
    position: relative;
    font-size: 12px;
    overflow: hidden;
  }
</style>