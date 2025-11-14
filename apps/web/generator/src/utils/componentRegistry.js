import { REMOTE_COMPONENT_URL } from './constant'

class ComponentRegistry {
  constructor(app) {
    this.app = app
    this.registeredComponents = new Set()
  }

  // 注册组件
  async registerComponent(name, loader) {
    if (this.app.component(name) || this.registeredComponents.has(name)) {
      return true
    }

    try {
      const component = await loader()
      if (
        typeof component === 'function' ||
        typeof component.install === 'function'
      ) {
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
      console.error(`组件：${name}，注册失败`, err)
      return false
    }
  }

  // 注册远端@mk/components的组件
  async registerMkComponent(name) {
    if (import.meta.env.MODE === 'development') {
      // 本地开发环境，直接从@mk/components中加载组件
      const loader = () => this.components[name]
      return this.registerComponent(name, loader)
    } else {
      // 生产环境，从dist目录中加载组件（需要配置组件的加载路径）
      const loader = () => import(`${REMOTE_COMPONENT_URL}/${name}/index.js`)
      return this.registerComponent(name, loader)
    }
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
export const createComponentRegistry = async (app) => {
  if (!registryInstance) {
    registryInstance = new ComponentRegistry(app)

    if (import.meta.env.MODE === 'development') {
      // 开发环境，直接从@mk/components中加载组件
      const { components } = await import('@mk/components')
      registryInstance.components = components
    }
  }
  return registryInstance
}
// 销毁单例实例
export const destoryComponentRegistry = () => {
  registryInstance = null
}

// 获取实例
export const getComponentRegistry = () => registryInstance
