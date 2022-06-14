<template>
  <div class="base-input">
    <input :value="parseInt(modelValue)" @input="update($event.target.value)" />
    <SuffixCharacter gap="16px" :suffix="suffix" />
  </div>
</template>

<script setup>
import SuffixCharacter from '@/components/suffixCharacter';

const props = defineProps({
  modelValue: {
    type: String,
    default: '1',
  },
  suffix: {
    type: String,
    default: 'px',
  },
});

const emit = defineEmits(['update:modelValue']);
const update = (value) => {
  value = value ? value + props.suffix : '0';
  emit('update:modelValue', value);
};
</script>

<style lang="scss" scoped>
.base-input {
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
