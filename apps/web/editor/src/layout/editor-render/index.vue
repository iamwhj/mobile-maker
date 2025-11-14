<script setup>
import { computed, ref } from 'vue'
import { isMobileEnv } from '@mk/utils'
import { useEditorStore } from '@mk/stores'
import { EditorCore } from '@mk/editor-core'
import AppHeader from './app-header/AppHeader.vue'
import { getComponentModel, selectComponent, generateStyle } from '@mk/editor-helper'
import { getComponentRegistry } from '../../utils/componentRegistry'

const store = useEditorStore()
const application = computed(() => store.application)
const currentMark = computed(() => store.currentComponent.mark)

// 组件注册器
const componentRegistry = getComponentRegistry()

// 拖入组件
const componentDrap = async (e) => {
  const data = e.dataTransfer.getData('component-drag')
  if (!data) return
  const component = JSON.parse(data)
  const componentData = getComponentModel({
    name: component.name,
    fullName: component.fullName,
  })

  // 注册组件
  await componentRegistry.registerMkComponent(component.name)

  // 添加组件
  store.addComponent(componentData)

  // 更新选中组件
  selectComponent({
    name: component.name,
    fullName: component.fullName,
    mark: componentData.mark,
  })
}

// 选中组件
const switchComponent = (component) => {
  selectComponent(component)
}

// 点击事件弹窗
const clickEventDialog = ref(false)
const clickDialogInfo = ref({
  title: '默认弹窗',
  content: '默认弹窗内容',
})
// 统一处理点击事件
const clickChock = (click) => {
  // 不是移动端
  if (!isMobileEnv() || !click || click.type === 'none') return () => false

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

<template>
  <div class="editor-render">
    <AppHeader></AppHeader>
    <div class="render-canvas" @drop.stop.prevent="componentDrap" @dragover.prevent>
      <EditorCore
        :components="application.components"
        :currentMark="currentMark"
        :switchComponent="switchComponent"
        :clickChock="clickChock"
        :generateStyle="generateStyle"
      ></EditorCore>
    </div>
    <el-dialog v-model="clickEventDialog" :title="clickDialogInfo.title" width="260px">
      {{ clickDialogInfo.content }}
      <template #footer>
        <el-button @click="clickEventDialog = false">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.editor-render {
  height: 425px;
  overflow: hidden;
}
.render-canvas {
  position: relative;
  height: calc(100% - 38px);
  overflow-y: auto;
  background-color: rgb(241, 234, 234);
  &::-webkit-scrollbar {
    display: none;
  }
  .checked {
    border: 1px dashed #1890ff;
  }

  .component-container {
    overflow: hidden;
    font-size: 0;
  }
}
</style>
