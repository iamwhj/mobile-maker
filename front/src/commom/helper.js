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
  const currenComp = components.find((c) => c.mark === currentMark);
  return currenComp;
};
// 获取当前选中组件索引
export const getCurrentComponetIndex = (store) => {
  const currentMark = store.getters.currentComponent.mark;
  const page = store.getters.page;
  const components = page.components;
  const index = components.findIndex((c) => c.mark === currentMark);
  return index;
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
