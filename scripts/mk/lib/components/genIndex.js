/**
 * 组件索引工具
 * 生成和更新组件的入口文件和组件列表文件
 */
import fs from 'fs'
import path from 'path'
import { targetDir, getComponentNames } from './utils.js'

// 更新组件列表文件（editor左侧组件拖拽栏使用）
export const updateComponentList = () => {
  const componentNames = getComponentNames()

  const componentListDir = path.resolve(targetDir, 'src/meta/componentList.js')

  const imports = componentNames.map((name) => `import ${name}Config from '../components/${name}/config'`).join('\n')

  const exportList = componentNames.map((name) => `${name}Config`).join(', ')

  const content = `// 内容由 mk CLI 生成，命令：npx mk components -i

${imports}

export const componentList = [${exportList}]
`

  fs.writeFileSync(componentListDir, content)
  console.log('组件列表文件已更新，路径：' + componentListDir)
}

// 更新组件导出入口文件（确保全部组件导出）
export const updateComponentExports = () => {
  const componentNames = getComponentNames()

  const componentExportsDir = path.resolve(targetDir, 'src/components/index.js')

  const exports = componentNames.map((name) => `export * from './${name}'`).join('\n')

  const content = `// 内容由 mk CLI 生成，命令：npx mk components -i

${exports}
`

  fs.writeFileSync(componentExportsDir, content)
  console.log('组件导出入口文件已更新，路径：' + componentExportsDir)
}
