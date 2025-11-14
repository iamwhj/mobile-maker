import { useEditorStore } from '@mk/stores'
import { deepClone, isContainerComponent } from '@mk/utils'
import { getHistoryModel } from './getModel'

// 打开活动配置
export const selectAppHeader = () => {
  const store = useEditorStore()
  store.changeCurrentComponent({
    name: 'application',
    fullName: '应用配置',
    mark: 'application-' + Date.now(),
  })
}

// 切换选中组件
export const selectComponent = (component) => {
  const store = useEditorStore()
  store.changeCurrentComponent({
    name: component.name,
    fullName: component.fullName,
    mark: component.mark,
  })
}

// 获取当前选中组件
export const getCurrentComponet = () => {
  const store = useEditorStore()
  const currentMark = store.currentComponent.mark
  const application = store.application
  const components = application.components
  let currenComp = components.find((c) => c.mark === currentMark)
  // 容器组件内部查找
  if (!currenComp) {
    components.forEach((comp) => {
      if (comp.components) {
        currenComp = comp.components.find((c) => c.mark === currentMark)
      }
    })
  }
  return currenComp
}
// 获取当前选中组件索引 （传containerCompnonents，即走的容器组件）
export const getCurrentComponetIndex = (containerCompnonents) => {
  const store = useEditorStore()
  const currentMark = store.currentComponent.mark
  const components = containerCompnonents || store.application.components
  const index = components.findIndex((c) => c.mark === currentMark)
  return index
}
// 获取容器组件及选中的子组件
export const getContainerComponet = () => {
  const store = useEditorStore()
  const currentMark = store.currentComponent.mark
  const application = store.application
  const components = application.components
  let containerInfo = {}
  components.forEach((comp) => {
    if (isContainerComponent(comp.name)) {
      const currenComp = comp.components.find((c) => c.mark === currentMark)
      containerInfo = currenComp ? { container: comp, subComp: currenComp } : {}
    }
  })
  return containerInfo
}

// 更新组件数据
export const updateComponent = ({ newDetail, key }) => {
  const store = useEditorStore()
  store.updateComponent({ newDetail, key })
}

// 处理传入的style对象
export const generateStyle = (style) => {
  // 几何属性，需要加单位px
  const sizeList = ['width', 'height']
  // 多余属性，需要剔除
  const reduceList = ['align']

  const ripeStyle = {}
  for (const key in style) {
    if (sizeList.includes(key)) {
      ripeStyle[key] = style[key] + 'px'
    } else if (!reduceList.includes(key)) {
      ripeStyle[key] = style[key]
    }
  }
  return ripeStyle
}

// 添加历史记录数据
export const setHistoryData = ({ type, name }) => {
  const store = useEditorStore()
  const applicationData = store.application
  const historyData = getHistoryModel({ type, name }, applicationData)
  store.addHistoryData(historyData)
}

// 合并覆盖应用数据
export const recoverApplicationData = (data) => {
  const store = useEditorStore()
  store.recoverApplicationData(data)
}
