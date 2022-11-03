<template>
  <el-form :model="form">
    <el-form-item label="背景颜色：">
      <ColorPicker v-model="form.backgroundColor"></ColorPicker>
    </el-form-item>
  </el-form>
  <BaseSetting></BaseSetting>
</template>

<script setup>
import { reactive, watch } from 'vue';
import BaseSetting from '@/components/baseSetting';

const props = defineProps({
  updateComponentProps: { type: Function },
  backgroundColor: { type: String, default: '#409EFF' },
});

const form = reactive({
  backgroundColor: props.backgroundColor,
});

watch(form, () => {
  props.updateComponentProps(form);
});
</script>

<style lang="scss" scoped>

</style>