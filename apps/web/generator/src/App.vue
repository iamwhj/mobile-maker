<template>
  <div class="wrap">
    <div class="container">
      <template v-for="comp in applicationData.components" :key="comp.id">
        <div :style="{ 'text-align': comp.style.align, 'font-size': 0 }">
          <div style="display: inline-block">
            <component :is="comp.name" v-bind="comp.ripeParams" :clickChock="clickChock(comp.click)"></component>
          </div>
        </div>
        <div v-if="applicationData.components.length === 0">应用数据缺失</div>
      </template>
    </div>
  </div>
  <el-dialog v-model="clickEventDialog" :title="clickDialogInfo.title" width="260px">
    {{ clickDialogInfo.content }}
    <template #footer>
      <el-button @click="clickEventDialog = false">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import { isMobileEnv } from '@mk/utils'
import { UNIT_WIDTH } from './utils/constant'
import { getComponentRegistry } from './utils/componentRegistry'
import { uniqBy } from 'lodash-es'

const instance = getCurrentInstance()
const componentRegistry = getComponentRegistry()

// eslint-disable-next-line no-undef
const applicationData = ref({})
const generatorEntry = async () => {
  try {
    // 应用数据获取，优先级：全局变量 appData > 全局属性 appData
    if (instance.proxy.appData) {
      applicationData.value = instance.proxy.appData
    } else if (appData) {
      applicationData.value = appData
    }

    // 按需注册组件
    const unitComponents = uniqBy(applicationData.value.components, 'name')
    const registerPromises = unitComponents.map((comp) => componentRegistry.registerMkComponent(comp.name))
    await Promise.all(registerPromises)
  } catch (err) {
    console.log(err)
    applicationData.value = { detail: { title: '应用数据缺失页' }, components: [] }
  }

  // process title
  document.title = applicationData.value.detail.title

  // process components
  applicationData.value.components.forEach((comp) => {
    for (const key in comp.style) {
      // 将px转换成rem(移动端适配)
      if (typeof comp.style[key] === 'number') comp.style[key] = comp.style[key] / UNIT_WIDTH + 'rem'
    }
    comp.ripeParams = {
      ...comp.style,
      ...comp.detail,
    }
  })
}
generatorEntry()

// 点击事件弹窗
const clickEventDialog = ref(false)
const clickDialogInfo = ref({
  title: '默认弹窗',
  content: '默认弹窗内容',
})
// 统一处理点击事件
const clickChock = (click) => {
  // 不是移动端
  if (!isMobileEnv() || !click) return () => false

  if (click.type === 'link' && click.url) {
    // link
    return () => (window.location.href = click.url)
  } else if (click.type === 'dialog') {
    // dialog
    return () => {
      // 弹窗出现
      clickEventDialog.value = true
      click.dialogTitle && (clickDialogInfo.value.title = click.dialogTitle)
      click.dialogContent && (clickDialogInfo.value.content = click.dialogContent)
    }
  }
}
</script>

<style lang="scss" scoped></style>
