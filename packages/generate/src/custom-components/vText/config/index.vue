<template>
  <el-form :model="form">
    <el-form-item label="文字内容：">
      <el-input
        v-model="form.content"
        style="width: 230px"
        placeholder="请输入内容"
      />
    </el-form-item>
    <el-form-item label="字体颜色：">
      <ColorPicker v-model="form.color" />
    </el-form-item>
    <el-form-item label="字体大小：">
      <BaseInput v-model="form.fontSize" />
    </el-form-item>
  </el-form>
  <BaseSetting></BaseSetting>
</template>

<script setup>
import { reactive, watch } from 'vue';
import BaseSetting from '@/components/baseSetting';
import ColorPicker from '@/components/colorPicker';
import BaseInput from '@/components/baseInput';

const props = defineProps({
  updateComponentProps: { type: Function },
  content: { type: String, default: '' },
  color: { type: String, default: '#000' },
  fontSize: { type: String, default: '16px' },
});

const form = reactive({
  content: props.content,
  color: props.color,
  fontSize: props.fontSize,
});

watch(form, () => {
  props.updateComponentProps(form);
});
</script>

<style lang="scss" scoped></style>
