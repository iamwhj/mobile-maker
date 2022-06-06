<template>
  <el-form :model="form">
    <el-form-item label="文字：">
      <el-input v-model="form.content" />
    </el-form-item>
    <el-form-item label="颜色：">
      <el-input v-model="form.color" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  updateCompDeail: { type: Function },
  content: { type: String, default: '' },
  color: { type: String, default: '' },
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
