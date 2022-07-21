<template>
  <div class="wrap">
    <div class="container">
      <template v-for="comp in components" :key="comp.id">
        <div style="display: inline-block">
          <component
            :is="comp.name"
            v-bind="comp.ripeParams"
            :clickChock="clickChock(comp.click)"
          ></component>
        </div>
      </template>
    </div>
  </div>
  <el-dialog
    v-model="clickEventDialog"
    :title="clickDialogInfo.title"
    width="260px"
  >
    {{ clickDialogInfo.content }}
    <template #footer>
      <el-button @click="clickEventDialog = false">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { isMobileEnv } from './utils';

const { VUE_APP_UNIT_WIDTH } = process.env;

// eslint-disable-next-line no-undef
const components = ref(activity.components);
components.value.forEach((comp) => {
  for (const key in comp.style) {
    // 将px转换成rem(移动端适配)
    if (typeof comp.style[key] === 'number')
      comp.style[key] = comp.style[key] / VUE_APP_UNIT_WIDTH + 'rem';
  }
  comp.ripeParams = {
    ...comp.style,
    ...comp.detail,
  };
});

// 点击事件弹窗
const clickEventDialog = ref(false);
const clickDialogInfo = ref({
  title: '默认弹窗',
  content: '默认弹窗内容',
});
// 统一处理点击事件
const clickChock = (click) => {
  // 不是移动端
  if (!isMobileEnv() || !click) return () => false;

  if (click.type === 'link' && click.url) {
    // link
    return () => (window.location.href = click.url);
  } else if (click.type === 'dialog') {
    // dialog
    return () => {
      // 弹窗出现
      clickEventDialog.value = true;
      click.dialogTitle && (clickDialogInfo.value.title = click.dialogTitle);
      click.dialogContent &&
        (clickDialogInfo.value.content = click.dialogContent);
    };
  }
};
</script>

<style lang="scss" scoped></style>
