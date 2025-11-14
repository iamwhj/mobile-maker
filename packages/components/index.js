// 组件分类和组件列表
export { componentCategory, componentList } from './src/meta'

// 组件按需引入
export * as components from './src/components'

// 组件全量引入
import installer from './src/installer'
export default installer
