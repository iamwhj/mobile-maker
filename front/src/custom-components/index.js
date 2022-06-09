import Text from './vText/component';
import TextConfig from './vText/config';
import Button from './vButton/component';
import ButtonConfig from './vButton/config';
import Image from './vImage/component';
import ImageConfig from './vImage/config';

const registerCustomComponents = (Vue) => {
  Vue.component('vText', Text);
  Vue.component('vTextConfig', TextConfig);
  Vue.component('vButton', Button);
  Vue.component('vButtonConfig', ButtonConfig);
  Vue.component('vImage', Image);
  Vue.component('vImageConfig', ImageConfig);
};

export default registerCustomComponents;
