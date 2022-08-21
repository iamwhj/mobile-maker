<template>
  <el-form :model="form">
    <el-form-item label="计时数值：">
      <BaseInput v-model="form.time" suffix="s" />
    </el-form-item>
    <el-form-item label="点击事件：">
      <ClickEventInput />
    </el-form-item>
  </el-form>
  <BaseSetting></BaseSetting>
</template>

<script setup>
// 分享示例版，功能不完整
import { reactive, watch, ref } from 'vue';
import BaseSetting from '@/components/baseSetting';
import BaseInput from '@/components/baseInput';
import ClickEventInput from '@/components/clickEventInput';

const props = defineProps({
  updateComponentProps: { type: Function },
  time: { type: String, default: '60s' },
});

const form = reactive({
  time: props.time,
});

watch(form, () => {
  props.updateComponentProps(form);
});

    const clickEvent = ref('none');
    // 点击事件列表
    const clickEventList = [
      { label: '无', value: 'none' },
      { label: '跳转链接', value: 'link' },
      { label: '弹出窗口', value: 'dialog' },
    ];
</script>

<style lang="scss" scoped></style>
