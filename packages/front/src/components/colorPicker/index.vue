<template>
  <div class="color-picker">
    <input
      type="text"
      :value="modelValue"
      @input="update($event.target.value)"
    />
    <el-color-picker v-model="color" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '#000',
  },
});

const color = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

const update = (value) => {
  emit('update:modelValue', value);
  color.value = value;
};

watch(color, () => {
  update(color.value);
});
</script>

<style lang="scss" scoped>
.color-picker {
  :deep(.el-color-picker) {
    position: relative;
    top: 1px;
    left: 10px;
  }
  input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 80%;
    &:focus {
      border: 1px solid #409eff;
    }
  }
}
</style>
