import { createApp } from 'vue'
import App from './App.vue'
import './plugins/echarts'
import setGeneratorEnv from './common/setupGeneratorEnv'
import { createComponentRegistry } from './utils/componentRegistry'

const app = createApp(App)

// 实例化组件注册器
await createComponentRegistry(app)

if (import.meta.env.MODE === 'development') {
  // 预览数据（调试：可替换为调试应用数据）
  app.config.globalProperties.appData = {
    components: [
      {
        name: 'mkButton',
        fullName: '按钮',
        mark: 'mkButton-1760186079840',
        detail: {},
        style: { width: 240, height: 28, align: 'left' },
      },
      {
        name: 'mkButton',
        fullName: '按钮',
        mark: 'mkButton-1760186080804',
        detail: {},
        style: { width: 240, height: 28, align: 'left' },
      },
      {
        name: 'mkButton',
        fullName: '按钮',
        mark: 'mkButton-1760186081645',
        detail: {},
        style: { width: 240, height: 28, align: 'left' },
      },
      {
        name: 'mkText',
        fullName: '文本',
        mark: 'mkText-1760186082724',
        detail: { content: '2', color: '#000', fontSize: '16px' },
        style: { width: 240, height: 20, align: 'left' },
      },
      {
        name: 'mkText',
        fullName: '文本',
        mark: 'mkText-1760186083659',
        detail: { content: '3', color: '#000', fontSize: '16px' },
        style: { width: 240, height: 20, align: 'left' },
      },
      {
        name: 'mkText',
        fullName: '文本',
        mark: 'mkText-1760186084524',
        detail: { content: '1', color: '#000', fontSize: '16px' },
        style: { width: 240, height: 20, align: 'left' },
      },
    ],
    detail: {
      name: '44',
      title: '444',
      date: ['2025-10-15T16:00:00.000Z', '2025-10-24T16:00:00.000Z'],
    },
    mark: 'activity-1760186071656',
  }
}

// 设置渲染环境（初始化css, 响应式）
setGeneratorEnv()

app.mount('#app')
