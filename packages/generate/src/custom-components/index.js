import Text from './vText/component';
import Button from './vButton/component';
import Image from './vImage/component';
import PieChart from './pieChart/component';

const registerCustomComponents = (Vue) => {
  Vue.component('vText', Text);
  Vue.component('vButton', Button);
  Vue.component('vImage', Image);
  Vue.component('pieChart', PieChart);
};

export default registerCustomComponents;
