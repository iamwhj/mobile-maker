<template>
  <el-divider />
  <el-form :model="form">
    <el-form-item label="宽度：">
      <el-input-number
        v-model="form.width"
        :min="0"
        :max="240"
        controls-position="right"
      />
      <SuffixCharacter />
    </el-form-item>
    <el-form-item label="高度：">
      <el-input-number
        v-model="form.height"
        :min="0"
        controls-position="right"
      />
      <SuffixCharacter />
    </el-form-item>
    <el-form-item label="对齐方式：">
      <el-radio-group v-model="form.align">
        <el-radio-button label="left">居左</el-radio-button>
        <el-radio-button label="center">居中</el-radio-button>
        <el-radio-button label="right">居右</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { nextTick, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import SuffixCharacter from '@/components/suffixCharacter';
import { getCurrentComponet, updateComponent } from '@/commom/helper';

const store = useStore();
const currentComponent = getCurrentComponet(store);
const ComponentStyle = currentComponent.style;

// style属性列表
const form = reactive({
  width: ComponentStyle.width || 0,
  height: ComponentStyle.height || 0,
  align: ComponentStyle.align || 'left',
});

nextTick(() => {
  // 赋值组件默认宽高
  const mark = currentComponent.mark;
  const componentDom = document.getElementsByClassName(mark)[0];
  const rawWidth = componentDom.style.width;
  const rawHeight = componentDom.style.height;
  const reg = /([0-9.]*)px/;
  form.width = Number(rawWidth.replace(reg, ($, $1) => $1));
  form.height = Number(rawHeight.replace(reg, ($, $1) => $1));
});

watch(form, () => {
  updateComponent(store, { newDetail: form, key: 'style' });
});
</script>

<style lang="scss" scoped>
.el-input {
  width: 150px;
}
</style>
