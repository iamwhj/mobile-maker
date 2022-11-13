import { createStore } from 'vuex';
import { getActivityTemplateData } from '@/common';
import { collectHistoryData, getCurrentComponet } from '@/common/helper';

export default createStore({
  state: {
    page: getActivityTemplateData(),
    currentComponent: {
      name: '',
      fullName: '',
      mark: '',
    },
    historyData: [],
  },
  getters: {
    page: (state) => state.page,
    currentComponent: (state) => state.currentComponent,
    historyData: (state) => state.historyData,
  },
  mutations: {
    addComponent(state, componentData) {
      state.page.components.push(componentData);

      collectHistoryData(this, {
        type: 'add',
        name: '添加组件-' + componentData.fullName,
      });
    },
    updateComponet(state, { newDetail, key }) {
      // key  1.page 更新活动detail 2.detail 更新组件detail 3.style 更新组件style
      if (key === 'page') {
        state.page.detail = { ...state.page.detail, ...newDetail };
        return;
      }
      // 获取当前选中组件
      let currentComp = getCurrentComponet(this);
      // 区分更新组件 detail 还是 style
      key === 'style'
        ? (currentComp.style = { ...currentComp.style, ...newDetail })
        : (currentComp.detail = { ...currentComp.detail, ...newDetail });

      collectHistoryData(this, {
        type: 'style',
        name: '修改样式-' + currentComp.fullName,
      });
    },
    insertComponent(state, { i, componentData, containerComponents }) {
      // 数组任意位置插入组件
      const components = containerComponents || state.page.components;
      components.splice(i, 0, componentData);

      collectHistoryData(this, {
        type: 'copy',
        name: '复制组件-' + componentData.fullName,
      });
    },
    deleteComponent(state, { i, containerComponents }) {
      // 提供下标，删除组件
      const components = containerComponents || state.page.components;
      const delComp = components.splice(i, 1);

      collectHistoryData(this, {
        type: 'delete',
        name: '删除组件-' + delComp[0]?.fullName,
      });
    },
    changeCurrentComponent(state, newComp) {
      // 切换选中组件
      state.currentComponent = newComp;
    },
    swapComponent(state, { orange: i1, target: i2, containerComponents }) {
      // 提供组件下标，交换位置
      const components = containerComponents || state.page.components;
      [components[i1], components[i2]] = [components[i2], components[i1]];

      collectHistoryData(this, {
        type: 'swap',
        name: '移动组件-' + components[i2].fullName,
      });
    },
    addHistoryData(state, historyData) {
      // 添加历史记录数据
      state.historyData.unshift(historyData);
    },
    recoverPageData(state, historyData) {
      state.page = { ...state.page, ...historyData };
    },
  },
  actions: {},
  modules: {},
});
