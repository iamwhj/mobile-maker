import Text from './vText/component'
import TextConfig from './vText/config'
import Button from './vButton/component'
import ButtonConfig from './vButton/config'
import Image from './vImage/component'
import ImageConfig from './vImage/config'
import PieChart from './pieChart/component'
import PieChartConfig from './pieChart/config'
import Time from './time/component'
import TimeConfig from './time/config'
import Carrier from './carrier/component'
import CarrierConfig from './carrier/config'

const registerCustomComponents = (Vue) => {
  Vue.component('vText', Text)
  Vue.component('vTextConfig', TextConfig)
  Vue.component('vButton', Button)
  Vue.component('vButtonConfig', ButtonConfig)
  Vue.component('vImage', Image)
  Vue.component('vImageConfig', ImageConfig)
  Vue.component('pieChart', PieChart)
  Vue.component('pieChartConfig', PieChartConfig)
  Vue.component('Time', Time)
  Vue.component('TimeConfig', TimeConfig)
  Vue.component('Carrier', Carrier)
  Vue.component('CarrierConfig', CarrierConfig)
}

export default registerCustomComponents
