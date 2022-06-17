import ActivityTopBarConfig from '@/views/activity/activityEdit/activityConfig/activityConfig';
import SvgIcon from '@/icon/SvgIcon';

// 注册全局组件
const registerGlobalComponent = (Vue) => {
  Vue.component('ActivityConfig', ActivityTopBarConfig);
  Vue.component('SvgIcon', SvgIcon);
};

export default registerGlobalComponent;
