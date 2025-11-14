import { createApp } from 'vue'
import App from './App'
import { createStore } from '@mk/stores'
import './plugins'
import { createComponentRegistry, destoryComponentRegistry } from './utils/componentRegistry'

// editor 构造函数
function Editor() {
  return {
    mount: function (container) {
      const app = createApp(App).use(createStore())

      createComponentRegistry(app)

      app.mount(container)

      this.app = app
      this.el = container

      return this.el
    },
    unmount: function () {
      this.app.unmount()
      destoryComponentRegistry()
    },
  }
}

export default Editor
