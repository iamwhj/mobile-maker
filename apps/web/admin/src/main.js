import { createApp } from 'vue'
import App from './App'
import router from './router'
import { createStore } from '@mk/stores'
import '@/style/index.scss'
import registerIcons from './plugins/element-icon'

const app = createApp(App).use(createStore()).use(router)
window.app = app
registerIcons(app)

app.mount('#app')
