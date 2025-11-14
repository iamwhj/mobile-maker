<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  updateComponentProps: { type: Function },
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  date: { type: Array, default: () => [] },
})

const form = reactive({
  name: props.name,
  title: props.title,
  date: props.date,
})

watch(form, () => props.updateComponentProps(form, 'application'))
</script>

<template>
  <el-form :model="form">
    <el-form-item label="应用名称：">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="页面标题：">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="起止时间：">
      <el-date-picker
        v-model="form.date"
        type="datetimerange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
