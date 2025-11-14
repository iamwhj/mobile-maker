import { baseComponent } from '../../meta/category'

export default {
  name: 'mkCarrier', // 组件命名key，唯一，需要和组件注册名一致
  full_name: '容器', // 组件名称
  path: new URL('../../../assets/文字.png', import.meta.url).href, // 组件图标路径
  category: baseComponent, // 组件分类
}
