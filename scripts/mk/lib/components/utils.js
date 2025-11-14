import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)
// 目标目录
export const targetDir = path.resolve(__dirname, '../../../../packages/components')

// 组件源码目录
export const componentsSrcDir = path.resolve(targetDir, 'src/components')

// 获取所有组件名称
export const getComponentNames = () => {
  try {
    const items = fs.readdirSync(componentsSrcDir, { withFileTypes: true })
    return items.filter((item) => item.isDirectory()).map((item) => item.name)
  } catch (error) {
    console.error('Failed to read components directory:', error)
    return []
  }
}

// 生成所有组件入口配置列表 { button: '/path/to/button/index.js', ... }
export const generateComponentEntries = () => {
  const componentNames = getComponentNames()
  const entries = {}

  componentNames.forEach((name) => {
    entries[name] = path.resolve(componentsSrcDir, name, 'index.js')
  })

  return entries
}
