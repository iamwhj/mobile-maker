<template>
  <div
    class="preview-content"
    @drop.stop.prevent="componentDrap"
    @dragover.prevent
  >
    <div
      v-for="component in page.components"
      :key="component.mark"
      :class="{
        'component-container': true,
        checked: component.mark === currentMark,
      }"
    >
      <component :is="component.name" v-bind="component.detail"></component>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { getComponentTemplateData } from '@/commom';
import { computed } from 'vue';

const store = useStore();
const page = store.getters.page;
const currentMark = computed(() => store.getters.currentComponent.mark);

const componentDrap = (e) => {
  const data = e.dataTransfer.getData('component-drag');
  const component = JSON.parse(data);
  const componentData = getComponentTemplateData(component.name);
  // 添加组件
  store.commit('addComponent', componentData);
  // 更新选中组件
  store.commit('changeCurrentComponent', {
    name: component.name,
    fullName: component.fullName,
    mark: componentData.mark,
  });
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
}
</style>
