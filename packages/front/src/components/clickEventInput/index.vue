<template>
  <div class="click-event-input">
    <el-select v-model="clickEvent">
      <el-option
        v-for="item in clickEventList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-form :model="form">
      <el-form-item v-show="clickEvent === 'link'">
        <el-input
          v-model="form.url"
          style="width: 220px"
          placeholder="请输入链接地址"
        />
      </el-form-item>
      <el-form-item v-show="clickEvent === 'dialog'">
        <el-input
          v-model="form.dialogTitle"
          style="width: 220px"
          placeholder="请输入弹窗标题"
        />
      </el-form-item>
      <el-form-item v-show="clickEvent === 'dialog'">
        <el-input
          v-model="form.dialogContent"
          style="width: 220px"
          placeholder="请输入弹窗内容"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, watch, watchEffect } from 'vue';
import { getCurrentComponet } from '@/commom/helper';
import { useStore } from 'vuex';

// 点击事件列表
const clickEventList = [
  { label: '无', value: 'none' },
  { label: '跳转链接', value: 'link' },
  { label: '弹出窗口', value: 'dialog' },
];

// 当前选中的组件
const store = useStore();
const currentComponent = getCurrentComponet(store);

// 数据绑定
const clickEvent = ref(
  currentComponent.click ? currentComponent.click.type : 'none'
);

// 点击事件表单收集
const clickData = currentComponent.click || {};
const form = reactive(clickData);
watchEffect(() => (form.type = clickEvent.value));

// 存储表单数据到组件
watch(form, () => {
  currentComponent.click = form;
});
</script>

<style lang="scss" scoped>
.click-event-input {
  .el-form {
    .el-form-item {
      .el-input {
        margin-top: 10px;
      }
    }
  }
}
</style>
