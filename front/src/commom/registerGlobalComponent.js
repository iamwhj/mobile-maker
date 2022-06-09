import ActivityTopBarConfig from '@/views/activity/activityEdit/activityConfig/activityConfig';

// 注册全局组件
const registerGlobalComponent = (Vue) => {
  Vue.component('ActivityConfig', ActivityTopBarConfig);
};

export default registerGlobalComponent;
