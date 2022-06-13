<template>
  <div class="color-picker">
    <input type="text" :value="value" @input="update($event.target.value)" />
    <el-color-picker v-model="color" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: '#000',
  },
});

const color = ref(props.value);

const emit = defineEmits(['update:value']);

const update = (value) => {
  emit('update:value', value);
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
    left: 12px;
  }
}
</style>
