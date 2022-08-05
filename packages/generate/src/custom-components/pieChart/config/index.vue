<template>
  <el-form :model="form">
    <el-form-item>
      <div class="title1">图表数据</div>
      <EditTable :dataSource="form.dataSource" :denyDataB="true"></EditTable>
    </el-form-item>
    <el-form-item>
      <div class="title1">饼图配置</div>
      <div class="flex-box">
        <span>图例开关</span>
        <el-switch
          v-model="form.legendShow"
          inline-prompt
          active-text="开"
          inactive-text="关"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>
      <div class="flex-box">
        <span>内环半径</span>
        <el-slider v-model="form.innerRadius" show-input />
      </div>
      <div class="flex-box">
        <span>外环半径</span>
        <el-slider v-model="form.outerRadius" show-input />
      </div>
    </el-form-item>
  </el-form>
  <BaseSetting></BaseSetting>
</template>

<script setup>
import { reactive, watch } from 'vue';
import BaseSetting from '@/components/baseSetting';
import EditTable from '@/components/editTable';

const props = defineProps({
  updateComponentProps: { type: Function },
  dataSource: {
    type: Array,
    default: () => [{ key: 0, name: '样例', dataA: '100', dataB: null }],
  },
  innerRadius: { type: Number, default: 40 },
  outerRadius: { type: Number, default: 80 },
  legendShow: { type: Boolean, default: true },
});
const form = reactive({
  dataSource: props.dataSource,
  innerRadius: props.innerRadius,
  outerRadius: props.outerRadius,
  legendShow: props.legendShow,
});

watch(form, () => {
  props.updateComponentProps(form);
});
</script>

<style lang="scss" scoped>
.title1 {
  width: 100%;
}
.flex-box {
  display: flex;
  width: 90%;
  margin-top: 10px;
  span {
    width: 80px;
    font-size: 13px;
  }
}
</style>
