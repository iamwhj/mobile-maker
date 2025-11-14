import { withInstall } from '@mk/utils'
import Button from './src/entry.vue'
import propsForm from './src/propsForm.vue'

export const mkButton = withInstall(Button, { propsForm })
export default mkButton
