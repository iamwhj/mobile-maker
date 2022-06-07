<template>
  <div class="component-setting">
    <div class="title">属性配置 - {{ fullName }}</div>
    <component :is="name" :updateCompDeail="updateCompDeail"></component>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const name = computed(() => store.getters.currentComponent.name + 'Config');
const fullName = computed(() => store.getters.currentComponent.fullName);

// 注入更新配置函数
const updateCompDeail = (newDetail, key = 'component') => {
  store.commit('updateComponet', { newDetail, key });
};
</script>

<style lang="scss" scoped>
.component-setting {
  height: 100%;
  padding: 12px;
  font-size: 14px;
  .title {
    font-weight: 500;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 30px;
  }
  :deep(.el-input) {
    width: 230px;
  }
}
</style>
