import { createApp } from 'vue'
import App from './App'
import { createStore } from '@mk/stores'
import './style.scss'
import { createComponentRegistry } from './utils/componentRegistry'

const app = createApp(App).use(createStore())

createComponentRegistry(app)

app.mount('#app')
