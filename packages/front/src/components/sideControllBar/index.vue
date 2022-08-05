<template>
  <div class="side-controll-bar">
    <el-icon :size="20" @click="move('up')">
      <Top />
    </el-icon>
    <el-icon :size="20" @click="move('down')">
      <Bottom />
    </el-icon>
    <el-icon :size="20" @click="copy">
      <Plus />
    </el-icon>
    <el-icon :size="20" @click="del">
      <Delete />
    </el-icon>
  </div>
</template>

<script setup>
import { Top, Bottom, Plus, Delete } from '@element-plus/icons-vue';
import { computed, reactive, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { getCurrentComponetIndex, openActivityConfig } from '@/common/helper';
import { deepClone } from '@/utils';

const store = useStore();
const components = computed(() => store.getters.page.components);
const currentComponent = computed(() => store.getters.currentComponent);

// 是否已选中组件
const checked = computed(() => {
  const mark = currentComponent.value.mark;
  if (mark && !mark.startsWith('activity-')) return true;
  return false;
});

// icon动态样式
const elIconStyle = reactive({});
watchEffect(() => {
  if (checked.value) {
    elIconStyle.cursor = 'pointer';
    elIconStyle.color = '#000';
    elIconStyle.hoverColor = 'rgb(62, 144, 211)';
  } else {
    elIconStyle.cursor = 'not-allowed';
    elIconStyle.color = '#aaa';
    elIconStyle.hoverColor = '#aaa';
  }
});

// 返回选中组件的索引
const curCompIdx = () => {
  if (!checked.value) return -1;
  const curCompIdx = getCurrentComponetIndex(store);
  return curCompIdx;
};

const move = (type) => {
  // 当前选中的组件数组索引
  const idx = curCompIdx();
  if (idx < 0) return;

  const compLen = components.value.length;
  if (type === 'up') {
    // 向上移动
    if (idx === 0) return;
    else {
      store.commit('swapComponent', { orange: idx, target: idx - 1 });
    }
  } else {
    // 向下移动
    if (idx === compLen - 1) return;
    else {
      store.commit('swapComponent', { orange: idx, target: idx + 1 });
    }
  }
};

const copy = () => {
  // 当前选中的组件数组索引
  const idx = curCompIdx();
  if (idx < 0) return;

  const componentData = deepClone(components.value[idx]);
  // 更新mark
  componentData.mark = componentData.name + '-' + Date.now();
  store.commit('insertComponent', { i: idx + 1, componentData });
};
const del = () => {
  // 当前选中的组件数组索引
  const idx = curCompIdx();
  if (idx < 0) return;

  store.commit('deleteComponent', idx);

  openActivityConfig(store);
};
</script>

<style lang="scss" scoped>
.side-controll-bar {
  position: absolute;
  top: 35%;
  right: -32px;
  width: 36px;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 4px;
  background: #eee;
  .el-icon:not(:first-child) {
    margin-top: 8px;
  }
  .el-icon {
    cursor: v-bind('elIconStyle.cursor');
    color: v-bind('elIconStyle.color');
    &:hover {
      color: v-bind('elIconStyle.hoverColor');
    }
  }
}
</style>
