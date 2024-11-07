import { createApp } from 'vue'
import App from './App'
import router from './router'
import { createPinia } from 'pinia'
import '@/style/index.scss'
import '@/plugins/echarts'
import registerGlobalComponent from '@/common/registerGlobalComponent'
import registerCustomComponents from './custom-components'

const app = createApp(App).use(createPinia()).use(router)
// Vue挂载至全局
window.Vue = app
// 自定义组件全局注册
registerGlobalComponent(app)
registerCustomComponents(app)

app.mount('#app')
