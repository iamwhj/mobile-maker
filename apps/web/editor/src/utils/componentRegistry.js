import { components as mkComponents } from '@mk/components'

class ComponentRegistry {
  constructor(app) {
    this.app = app
    this.registeredComponents = new Set()
  }

  // 注册组件
  async registerComponent(name, loader) {
    if (this.registeredComponents.has(name)) {
      return true
    }

    try {
      const component = await loader()
      if (typeof component === 'function' || typeof component.install === 'function') {
        // plugin component
        this.app.use(component)
      } else {
        // normal component
        this.app.component(name, component.default)
      }
      this.registeredComponents.add(name)
      console.warn(`${name} 组件，注册成功！`)
      return true
    } catch (err) {
      console.error(`组件：${name}，注册失败`)
      return false
    }
  }

  // 注册来自@mk/components的组件
  async registerMkComponent(name) {
    const loader = () => mkComponents[name]
    return this.registerComponent(name, loader)
  }

  // 检查组件是否注册
  isRegistered(name) {
    return this.registeredComponents.has(name)
  }

  // 已注册的组件列表
  getRegisteredComponents() {
    return Array.from(this.registeredComponents)
  }
}

// 创建单例实例
let registryInstance = null
export const createComponentRegistry = (app) => {
  if (!registryInstance) {
    registryInstance = new ComponentRegistry(app)
  }
  return registryInstance
}
// 销毁单例实例
export const destoryComponentRegistry = () => {
  registryInstance = null
}

// 获取实例
export const getComponentRegistry = () => registryInstance
