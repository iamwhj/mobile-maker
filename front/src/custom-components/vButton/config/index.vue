<template>
  <el-form :model="form">
    <el-form-item label="按钮文字：">
      <el-input v-model="form.content" style="width: 230px" />
    </el-form-item>
    <el-form-item label="文字颜色：">
      <ColorPicker v-model:value="form.color"></ColorPicker>
    </el-form-item>
    <el-form-item label="背景颜色：">
      <el-input v-model="form.backgroundColor" style="width: 230px" />
    </el-form-item>
    <el-form-item label="按钮圆角：">
      <el-input v-model="form.borderRadius" style="width: 230px" />
    </el-form-item>
  </el-form>
  <BaseSetting></BaseSetting>
</template>

<script setup>
import { reactive, watch } from 'vue';
import BaseSetting from '@/components/baseSetting';
import ColorPicker from '@/components/colorPicker';

const props = defineProps({
  updateCompDeail: { type: Function },
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
  console.log('form',form );
  props.updateCompDeail(form);
});
</script>

<style lang="scss" scoped></style>
