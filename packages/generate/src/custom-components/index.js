import Text from './vText/component';
import Button from './vButton/component';
import Image from './vImage/component';

const registerCustomComponents = (Vue) => {
  Vue.component('vText', Text);
  Vue.component('vButton', Button);
  Vue.component('vImage', Image);
};

export default registerCustomComponents;
