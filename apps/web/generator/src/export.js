import { createApp } from 'vue'
import App from './App.vue'
import setGeneratorEnv from './common/setupGeneratorEnv'
import './plugins/echarts'
import mkComponents from '@mk/components'
import { createComponentRegistry } from './utils/componentRegistry'

function Generator() {
  return {
    async mount(container, { appData }) {
      const app = createApp(App)

      await createComponentRegistry(app)

      app.config.globalProperties.appData = appData

      app.use(mkComponents)
      app.mount(container)

      this.app = app
      this.el = container

      return this.el
    },
    unmount() {
      this.app.unmount()
    },
    setGeneratorEnv,
  }
}

export default Generator
