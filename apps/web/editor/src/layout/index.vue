<script setup>
import { useEditorStore } from '@mk/stores'
import ComponentList from './component-list'
import EditorRender from './editor-render'
import PropSetting from './prop-setting'
import SideControllBar from '../components/sideControllBar'
import ToolsBar from '../components/toolsBar'
import { getComponentRegistry } from '../utils/componentRegistry'
import { uniqBy } from 'lodash-es'
import { selectAppHeader } from '@mk/editor-helper'

const editorEntry = async () => {
  // 注册应用右侧表单配置组件
  const componentRegistry = getComponentRegistry()
  const loader = () => import('./editor-render/app-header/AppPropsForm.vue')
  await componentRegistry.registerComponent('ApplicationPropsForm', loader)

  // 初始化应用信息
  const editorStore = useEditorStore()
  const appData = await editorStore.initApplication()

  // 注册应用中已使用的组件（做组件去重注册）
  const usedComponents = appData.components
  const unitComponents = uniqBy(usedComponents, 'name')
  const loaderList = []
  for (const comp of unitComponents) {
    loaderList.push(componentRegistry.registerMkComponent(comp.name))
  }
  await Promise.all(loaderList)

  // 渲染应用
  editorStore.recoverApplicationData(appData)

  // 选中应用配置组件
  selectAppHeader()
}
editorEntry()
</script>

<template>
  <div class="editor-layout">
    <div class="editor-assemble">
      <div class="components">
        <ComponentList />
      </div>
      <div class="mobile">
        <EditorRender />
        <SideControllBar />
      </div>
      <div class="attribute">
        <PropSetting />
      </div>
      <div class="toolsBar">
        <ToolsBar />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-layout {
  height: calc(100vh - 42px);
  overflow: hidden;
  .editor-assemble {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .components {
      width: 300px;
      height: 100%;
      // box-shadow: 7px 0px 7px 0px rgb(0 21 41 / 8%);
      border-right: 1px solid #eee;
    }
    .mobile {
      position: relative;
      width: 276px;
      height: 560px;
      background-image: url('../assets/model.png');
      background-repeat: no-repeat;
      background-size: 276px 560px;
      box-sizing: border-box;
      padding: 68px 17px 0 17px;
    }
    .attribute {
      width: 400px;
      height: 100%;
      border-left: 1px solid #eee;
    }
    .toolsBar {
      position: absolute;
      top: 100px;
      right: 400px;
    }
  }
}
</style>
