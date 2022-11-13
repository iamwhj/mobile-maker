<template>
  <div
    class="carrier"
    :style="carrierStyle"
    @drop.stop="componentDrap"
    @dragover.prevent
  >
    <div
      v-for="component in components"
      :key="component.mark"
      :class="{ checked: component.mark === currentMark }"
      :style="componentWrapperStyle(component.style)"
      @click.stop="switchComponent(component)"
    >
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
import { selectComponent, generateStyle } from '@/common/helper';
import { useStore } from 'vuex';

const props = defineProps({
  clickChock: { type: Function, default: () => {} },
  components: { type: Array, default: () => [] },
  width: { type: String, default: '240px' },
  height: { type: String, default: '200px' },
  type: { type: String, default: 'free' },
  backgroundColor: { type: String, default: '#EBF29D' },
});

// 容器style
const carrierStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
    backgroundColor: props.backgroundColor,
  };
});

// 组件包装style
const componentWrapperStyle = (componentStyle) => {
  const componentFreeStyle = {
    position: 'absolute',
    left: componentStyle.left,
    top: componentStyle.top,
  };
  return props.type === 'free' ? componentFreeStyle : {};
};

const emit = defineEmits(['update:components']);
// 元素拖入carrier组件
const componentDrap = (e) => {
  const data = e.dataTransfer.getData('component-drag');
  const component = JSON.parse(data);
  const componentData = getComponentTemplateData({
    name: component.name,
    fullName: component.fullName,
  });
  // 组件数据添加到容器components
  emit('update:components', [...props.components, componentData]);
};

const store = useStore();
const currentMark = computed(() => store.getters.currentComponent.mark);
// 选中组件
const switchComponent = (component) => {
  selectComponent(store, component);
};
</script>

<style lang="scss" scoped>
.carrier {
  position: relative;
  font-size: 12px;
  overflow: hidden;
}

.checked {
  border: 1px dashed #1890ff;
}
</style>
