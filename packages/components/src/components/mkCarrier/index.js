import { withInstall } from '@mk/utils'
import Carrier from './src/entry.vue'
import propsForm from './src/propsForm.vue'

export const mkCarrier = withInstall(Carrier, { propsForm })
export default mkCarrier
