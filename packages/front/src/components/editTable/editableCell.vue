<template>
  <div v-if="!denyCell" class="editable-cell" @click="edit">
    <div v-show="editable" class="editable-cell-input-wrapper">
      <el-input
        ref="aInput"
        size="small"
        :modelValue="modelValue"
        @input="handleChange"
        @keydown.enter="editable = false"
        @blur.stop="editable = false"
      />
    </div>
    <div v-show="!editable" class="editable-cell-text-wrapper">
      {{ modelValue || ' ' }}
    </div>
  </div>
  <div v-else class="editable-cell deny-table-cell">
    <div class="editable-cell-text-wrapper">
      {{ modelValue || ' ' }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    denyCell: Boolean, // 是否禁用单元格
  },
  data() {
    return {
      editable: false,
    };
  },
  methods: {
    handleChange(val) {
      this.$emit('update:modelValue', val);
    },
    edit() {
      // 显示输入框并聚焦
      this.editable = true;
      this.$nextTick(() => {
        this.$refs.aInput.focus();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.editable-cell {
  padding: 6px;
  height: 100%;
  .editable-cell-input-wrapper {
    height: 20px;
    .el-input {
      width: 100%;
      :deep(.el-input__inner) {
        height: 20px;
      }
    }
  }

  .editable-cell-text-wrapper {
    width: 100%;
    min-height: 21px;
  }
}
.deny-table-cell {
  background: #fafafa;
  cursor: not-allowed;
}
</style>
