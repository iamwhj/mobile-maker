import { deepClone } from '@/utils';
import { isContainerComponent } from '@/utils/check';

// 打开活动配置
export const openActivityConfig = (store) => {
  store.commit('changeCurrentComponent', {
    name: 'activity',
    fullName: '活动页',
    mark: 'activity-' + Date.now(),
  });
};

// 切换选中组件
export const selectComponent = (store, component) => {
  store.commit('changeCurrentComponent', {
    name: component.name,
    fullName: component.fullName,
    mark: component.mark,
  });
};

// 获取当前选中组件
export const getCurrentComponet = (store) => {
  const currentMark = store.getters.currentComponent.mark;
  const page = store.getters.page;
  const components = page.components;
  let currenComp = components.find((c) => c.mark === currentMark);
  // 容器组件内部查找
  if (!currenComp) {
    components.forEach((comp) => {
      if (comp.components) {
        currenComp = comp.components.find((c) => c.mark === currentMark);
      }
    });
  }
  return currenComp;
};
// 获取当前选中组件索引 （传containerCompnonents，即走的容器组件）
export const getCurrentComponetIndex = (store, containerCompnonents) => {
  const currentMark = store.getters.currentComponent.mark;
  const components = containerCompnonents || store.getters.page.components;
  const index = components.findIndex((c) => c.mark === currentMark);
  return index;
};
// 获取容器组件及选中的子组件
export const getContainerComponet = (store) => {
  const currentMark = store.getters.currentComponent.mark;
  const page = store.getters.page;
  const components = page.components;
  let containerInfo = {};
  components.forEach((comp) => {
    if (isContainerComponent(comp.name)) {
      const currenComp = comp.components.find((c) => c.mark === currentMark);
      containerInfo = currenComp
        ? { container: comp, subComp: currenComp }
        : {};
    }
  });
  return containerInfo;
};

// 更新组件数据
export const updateComponent = (store, { newDetail, key }) => {
  store.commit('updateComponet', { newDetail, key });
};

// 处理传入的style对象
export const generateStyle = (style) => {
  // 几何属性，需要加单位px
  const sizeList = ['width', 'height'];
  // 多余属性，需要剔除
  const reduceList = ['align'];

  const ripeStyle = {};
  for (const key in style) {
    if (sizeList.includes(key)) {
      ripeStyle[key] = style[key] + 'px';
    } else if (!reduceList.includes(key)) {
      ripeStyle[key] = style[key];
    }
  }
  return ripeStyle;
};

// 添加历史记录数据
export const collectHistoryData = (store, { type, name }) => {
  const pageData = store.getters.page;
  const historyData = {
    type,
    name,
    data: deepClone(pageData),
  };
  store.commit('addHistoryData', historyData);
};

// 合并覆盖page数据
export const recoverPageData = (store, data) => {
  store.commit('recoverPageData', data);
};
