<template>
  <el-form :model="form">
    <el-form-item label="按钮文字：">
      <el-input v-model="form.content" style="width: 230px" />
    </el-form-item>
    <el-form-item label="字体颜色：">
      <ColorPicker v-model="form.color"></ColorPicker>
    </el-form-item>
    <el-form-item label="背景颜色：">
      <ColorPicker v-model="form.backgroundColor"></ColorPicker>
    </el-form-item>
    <el-form-item label="按钮圆角：">
      <BaseInput v-model="form.borderRadius" />
    </el-form-item>
    <el-form-item label="点击事件：">
      <ClickEventInput />
    </el-form-item>
  </el-form>
  <BaseSetting></BaseSetting>
</template>

<script setup>
import { reactive, watch } from 'vue';
import BaseSetting from '@/components/baseSetting';
import ColorPicker from '@/components/colorPicker';
import BaseInput from '@/components/baseInput';
import ClickEventInput from '@/components/clickEventInput';

const props = defineProps({
  updateComponentProps: { type: Function },
  color: { type: String, default: '#fff' },
  backgroundColor: { type: String, default: '#409EFF' },
  borderRadius: { type: String, default: '4px' },
  content: { type: String, default: '按钮' },
});

const form = reactive({
  content: props.content,
  color: props.color,
  borderRadius: props.borderRadius,
  backgroundColor: props.backgroundColor,
});

watch(form, () => {
  props.updateComponentProps(form);
});
</script>

<style lang="scss" scoped></style>
