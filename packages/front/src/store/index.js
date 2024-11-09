import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getActivityTemplateData } from '@/common'
import { collectHistoryData, getCurrentComponet } from '@/common/helper'

export const useStore = defineStore('main', () => {
  // 应用schema
  const page = ref(getActivityTemplateData())

  // 当前选中的组件
  const currentComponent = ref({
    name: '',
    fullName: '',
    mark: '',
  })

  // 历史操作数据
  const historyData = ref([])

  function addComponent(componentData) {
    page.value.components.push(componentData)

    collectHistoryData({
      type: 'add',
      name: '添加组件-' + componentData.fullName,
    })
  }
  function updateComponet({ newDetail, key }) {
    // key  1.page 更新活动detail 2.detail 更新组件detail 3.style 更新组件style
    if (key === 'page') {
      page.value.detail = { ...page.value.detail, ...newDetail }
      return
    }
    // 获取当前选中组件
    let currentComp = getCurrentComponet()
    
    // 区分更新组件 detail 还是 style
    key === 'style'
      ? (currentComp.style = { ...currentComp.style, ...newDetail })
      : (currentComp.detail = { ...currentComp.detail, ...newDetail })

    collectHistoryData({
      type: 'style',
      name: '修改样式-' + currentComp.fullName,
    })
  }
  function insertComponent({ i, componentData, containerComponents }) {
    // 数组任意位置插入组件
    const components = containerComponents || this.page.components
    components.splice(i, 0, componentData)

    collectHistoryData({
      type: 'copy',
      name: '复制组件-' + componentData.fullName,
    })
  }
  function deleteComponent({ i, containerComponents }) {
    // 提供下标，删除组件
    const components = containerComponents || page.value.components
    const delComp = components.splice(i, 1)

    collectHistoryData({
      type: 'delete',
      name: '删除组件-' + delComp[0]?.fullName,
    })
  }
  function changeCurrentComponent(newComp) {
    // 切换选中组件
    currentComponent.value = newComp
  }
  function swapComponent({ orange: i1, target: i2, containerComponents }) {
    // 提供组件下标，交换位置
    const components = containerComponents || page.value.components
    ;[components[i1], components[i2]] = [components[i2], components[i1]]

    collectHistoryData({
      type: 'swap',
      name: '移动组件-' + components[i2].fullName,
    })
  }
  function addHistoryData(history) {
    // 添加历史记录数据
    historyData.value.unshift(history)
  }
  function recoverPageData(historyData) {
    page.value = { ...page.value, ...historyData }
  }

  return {
    page,
    currentComponent,
    historyData,
    recoverPageData,
    changeCurrentComponent,
    addComponent,
    updateComponet,
    insertComponent,
    deleteComponent,
    swapComponent,
    addHistoryData,
  }
})
