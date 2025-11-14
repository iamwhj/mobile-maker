import { withInstall } from '@mk/utils'
import Text from './src/entry.vue'
import propsForm from './src/propsForm.vue'

export const mkText = withInstall(Text, { propsForm })
export default mkText
