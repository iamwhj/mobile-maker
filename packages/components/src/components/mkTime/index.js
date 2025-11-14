import { withInstall } from '@mk/utils'
import Time from './src/entry.vue'
import propsForm from './src/propsForm.vue'

export const mkTime = withInstall(Time, { propsForm })
export default mkTime
