import qs from 'qs'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useHistory } from './useHistory'
import { getApplicationModel, setHistoryData, getCurrentComponet } from '@mk/editor-helper'
import { getApplicationById } from '@mk/api'

export const useEditorStore = defineStore('editor', () => {
  // 应用信息
  const appInfo = ref({ appId: '', status: '' })
  const setAppInfo = (info) => {
    if (typeof info.appId === 'string') info.appId = Number(info.appId)
    appInfo.value = { ...appInfo.value, ...info }
  }

  // 初始化应用schema
  const application = ref(getApplicationModel())

  // 当前选中的组件
  const currentComponent = ref({})
  function changeCurrentComponent(newComp) {
    // 切换选中组件
    currentComponent.value = newComp
  }

  // 历史记录
  const { historyData, addHistoryData, resetHistoryData } = useHistory()

  // 添加组件
  function addComponent(componentData) {
    application.value.components.push(componentData)

    setHistoryData({
      type: 'add',
      name: '添加组件-' + componentData.fullName,
    })
  }

  function updateComponent({ newDetail, key }) {
    // key  1.application 更新应用detail 2.detail 更新组件detail 3.style 更新组件style
    if (key === 'application') {
      application.value.detail = { ...application.value.detail, ...newDetail }
      return
    }
    // 获取当前选中组件
    let currentComp = getCurrentComponet()

    // 区分更新组件 detail 还是 style
    key === 'style'
      ? (currentComp.style = { ...currentComp.style, ...newDetail })
      : (currentComp.detail = { ...currentComp.detail, ...newDetail })

    setHistoryData({
      type: 'style',
      name: '修改样式-' + currentComp.fullName,
    })
  }
  // 数组任意位置插入组件
  function insertComponent({ i, componentData, containerComponents }) {
    const components = containerComponents || this.application.components
    components.splice(i, 0, componentData)

    setHistoryData({
      type: 'copy',
      name: '复制组件-' + componentData.fullName,
    })
  }
  // 提供下标，删除组件
  function deleteComponent({ i, containerComponents }) {
    const components = containerComponents || application.value.components
    const delComp = components.splice(i, 1)

    setHistoryData({
      type: 'delete',
      name: '删除组件-' + delComp[0]?.fullName,
    })
  }

  function swapComponent({ orange: i1, target: i2, containerComponents }) {
    // 提供组件下标，交换位置
    const components = containerComponents || application.value.components
    ;[components[i1], components[i2]] = [components[i2], components[i1]]

    setHistoryData({
      type: 'swap',
      name: '移动组件-' + components[i2].fullName,
    })
  }
  function recoverApplicationData(applicationData) {
    application.value = { ...application.value, ...applicationData }
  }

  // 初始化应用（editor entry）
  async function initApplication() {
    return new Promise((resolve) => {
      // 从url中获取applicationId（id存在是编辑，否则是新建）
      const urlParams = location.hash && location.hash.split('?')[1]
      const params = qs.parse(urlParams) || {}
      if (params.appId) {
        // 编辑应用
        getApplicationById({ id: params.appId }).then((result) => {
          const res = result.data
          if (res.code === 0) {
            const data = res.data
            const applicationData = JSON.parse(data.page)

            // 更新appInfo
            setAppInfo({ appId: params.appId, status: data.status })
            // 重置历史记录
            resetHistoryData()

            resolve(applicationData)
          }
        })
      } else {
        // 新建应用
        const applicationData = getApplicationModel()

        appInfo.value = { appId: '', status: '' }
        // 重置历史记录
        resetHistoryData()

        resolve(applicationData)
      }
    })
  }

  return {
    appInfo,
    setAppInfo,
    application,
    currentComponent,
    historyData,
    recoverApplicationData,
    changeCurrentComponent,
    addComponent,
    updateComponent,
    insertComponent,
    deleteComponent,
    swapComponent,
    addHistoryData,
    resetHistoryData,
    initApplication,
  }
})
