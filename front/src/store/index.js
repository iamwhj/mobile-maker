import { createStore } from 'vuex';

export default createStore({
  state: {
    page: {
      components: [],
      detail: {
        name: '',
        title: '活动标题',
      },
      mark: 'activity-' + Date.now(),
    },
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
    updateComponet(state, newDetail) {
      const mark = state.currentComponent.mark;
      let currentComp = state.page.components.find((c) => c.mark === mark);
      currentComp.detail = { ...currentComp.detail, ...newDetail };
      console.log(state.page);
    },
    changeCurrentComponent(state, newComp) {
      state.currentComponent = newComp;
    },
  },
  actions: {},
  modules: {},
});
