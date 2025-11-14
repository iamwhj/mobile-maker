import { chartComponent } from '../../meta/category'

export default {
  name: 'mkPieChart', // 组件命名key，唯一，需要和组件注册名一致
  full_name: '饼图', // 组件名称
  path: new URL('../../../assets/饼图.png', import.meta.url).href, // 组件图标路径
  category: chartComponent, // 组件分类
}
