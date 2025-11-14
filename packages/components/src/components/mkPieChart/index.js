import { withInstall } from '@mk/utils'
import PieChart from './src/entry.vue'
import propsForm from './src/propsForm.vue'

export const mkPieChart = withInstall(PieChart, { propsForm })
export default mkPieChart
