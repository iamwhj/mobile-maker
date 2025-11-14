import { withInstall } from '@mk/utils'
import Image from './src/entry.vue'
import propsForm from './src/propsForm.vue'

export const mkImage = withInstall(Image, { propsForm })
export default mkImage
