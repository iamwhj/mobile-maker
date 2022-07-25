<template>
  <div :style="{ width: width, height: height }">
    <div :id="container" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup>
import echarts from '@/plugins/echarts';
import { nextTick, onMounted, watch } from 'vue';
import { getPieOptions } from './usePieOption';
import { debounce } from '@/utils';

const props = defineProps({
  width: { type: String, default: '240px' },
  height: { type: String, default: '240px' },
  dataSource: {
    type: Array,
    default: () => [{ key: 0, name: '样例', dataA: '100', dataB: null }],
  },
  innerRadius: { type: Number, default: 40 },
  outerRadius: { type: Number, default: 80 },
  legendShow: { type: Boolean, default: true },
});

// 饼图容器ID
const container = 'pieChart-' + Math.random();
// 饼图实例
let pieChart = null;

// 挂载更新饼图
const mountPieChart = () => {
  const options = getPieOptions(props);
  if (!pieChart) {
    // 初始化
    const pie = echarts.init(document.getElementById(container));
    pie.setOption(options);
    pieChart = pie;
  } else {
    // 更新
    pieChart.setOption(options);
  }
};

// 防抖更新
const updatePieChart = debounce(mountPieChart, 200);

onMounted(() => {
  // 初始化挂载饼图
  nextTick(() => {
    mountPieChart();
  });
});

// 更新饼图
watch(props, () => {
  updatePieChart();
  nextTick(() => {
    // 若容器几何属性发生变化时更新（width、height）
    pieChart.resize();
  });
});
</script>

<style lang="scss" scoped></style>
