import { complexComponent } from '../../meta/category'

export default {
  name: 'mkTime', // 组件命名key，唯一，需要和组件注册名一致
  full_name: '时间', // 组件名称
  path: new URL('../../../assets/时间.png', import.meta.url).href, // 组件图标路径
  category: complexComponent, // 组件分类
}
