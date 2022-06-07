export const openActivityConfig = (store) => {
  store.commit('changeCurrentComponent', {
    name: 'ActivityTopBar',
    fullName: '活动页',
    mark: 'ActivityTopBar' + Date.now(),
  });
};
