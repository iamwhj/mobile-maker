<template>
  <div class="component-setting">
    <div class="title">属性配置 - {{ fullName }}</div>
    <component
      :is="name"
      :key="currentMark"
      :updateComponentProps="updateComponentProps"
      v-bind="config"
    ></component>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { updateComponent } from '@/common/helper';

const store = useStore();
const name = computed(() => store.getters.currentComponent.name + 'Config');
const fullName = computed(() => store.getters.currentComponent.fullName);
const currentMark = computed(() => store.getters.currentComponent.mark);

const config = computed(() => {
  const page = store.getters.page;
  const currentComponent = store.getters.currentComponent;
  if (currentComponent.name === 'activity') {
    return page.detail;
  } else {
    const component = page.components.find(
      (c) => c.mark === currentComponent.mark
    );
    const componentConfig = component?.detail || {};
    return componentConfig;
  }
});

// 注入更新配置函数
const updateComponentProps = (newDetail, key = 'detail') => {
  updateComponent(store, { newDetail, key });
};
</script>

<style lang="scss" scoped>
.component-setting {
  height: 100%;
  width: 100%;
  padding: 12px;
  font-size: 14px;
  overflow-y: auto;
  overflow-x: hidden;
  .title {
    font-weight: 500;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 30px;
  }
}
</style>
