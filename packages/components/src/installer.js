import * as components from './components'

// 组件全量引入
function installComponents() {
  const componentList = []
  for (const key in components) {
    if (!Object.hasOwn(components, key)) continue
    const comp = components[key]
    componentList.push(comp)
  }

  const install = (app) => {
    componentList.forEach((c) => app.use(c))
  }
  return install
}

export default installComponents()
