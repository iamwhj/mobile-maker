<template>
  <el-form :model="form">
    <el-form-item label="文字：">
      <el-input
        v-model="form.content"
        style="width: 230px"
        placeholder="请输入内容"
      />
    </el-form-item>
    <el-form-item label="颜色：">
      <ColorPicker v-model="form.color" />
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
  content: { type: String, default: '' },
  color: { type: String, default: '#000' },
});

const form = reactive({
  content: props.content,
  color: props.color,
});

watch(form, () => {
  props.updateCompDeail(form);
});
</script>

<style lang="scss" scoped></style>
