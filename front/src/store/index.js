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
      if (key === 'page') {
        state.page.detail = { ...state.page.detail, ...newDetail };
        return;
      }
      const mark = state.currentComponent.mark;
      let currentComp = state.page.components.find((c) => c.mark === mark);
      currentComp.detail = { ...currentComp.detail, ...newDetail };
    },
    changeCurrentComponent(state, newComp) {
      state.currentComponent = newComp;
    },
  },
  actions: {},
  modules: {},
});
