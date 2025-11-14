<script setup>
import { reactive, watch } from 'vue'
import BaseSetting from '../../../../shared/baseSetting'

const props = defineProps({
  updateComponentProps: { type: Function },
  type: { type: String, default: 'free' },
  backgroundColor: { type: String, default: '#EBF29D' },
})

const form = reactive({
  type: props.type,
  backgroundColor: props.backgroundColor,
})

watch(form, () => {
  props.updateComponentProps(form)
})
</script>

<template>
  <el-form :model="form">
    <el-form-item label="排列规则：">
      <el-radio-group v-model="form.type">
        <el-radio label="free">自由画布</el-radio>
        <el-radio label="normal">垂直画布</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="背景颜色：">
      <ColorPicker v-model="form.backgroundColor"></ColorPicker>
    </el-form-item>
  </el-form>
  <BaseSetting></BaseSetting>
</template>

<style lang="scss" scoped></style>
