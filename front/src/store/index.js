import { createStore } from 'vuex';
import { getActivityTemplateData } from '@/commom';

export default createStore({
  state: {
    page: getActivityTemplateData(),
    currentComponent: {
      name: '',
      fullName: '',
      mark: '',
    },
  },
  getters: {
    page: (state) => state.page,
    currentComponent: (state) => state.currentComponent,
  },
  mutations: {
    addComponent(state, componentData) {
      state.page.components.push(componentData);
    },
    updateComponet(state, { newDetail, key }) {
      // key  1.page 更新活动detail 2.detail 更新组件detail 3.style 更新组件style
      if (key === 'page') {
        state.page.detail = { ...state.page.detail, ...newDetail };
        return;
      }
      const mark = state.currentComponent.mark;
      let currentComp = state.page.components.find((c) => c.mark === mark);
      // 区分更新组件 detail 还是 style
      key === 'style'
        ? (currentComp.style = { ...currentComp.style, ...newDetail })
        : (currentComp.detail = { ...currentComp.detail, ...newDetail });
    },
    changeCurrentComponent(state, newComp) {
      state.currentComponent = newComp;
    },
  },
  actions: {},
  modules: {},
});
