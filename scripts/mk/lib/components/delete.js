/**
 * 组件删除工具
 * 删除组件和组件注册信息
 */
import fs from 'fs'
import path from 'path'
import { targetDir } from './utils.js'

// 删除组件
export const deleteComponent = (componentName) => {
  // 组件目录路径
  const componentDir = path.join(targetDir, 'src/components', componentName)
  if (!fs.existsSync(componentDir)) {
    console.error(`组件 ${componentName} 不存在，无法删除。`)
    // return
  }
  // 删除组件目录
  fs.rmSync(componentDir, { recursive: true, force: true })

  // 删除组件导出信息 index.js
  const exportContent = `export * from './${componentName}'`
  const indexPath = path.join(targetDir, 'src/components/index.js')
  // 读取现有的 index.js 内容
  let indexData = fs.readFileSync(indexPath, 'utf-8')
  // 移除对应组件的导出行
  const updatedIndexData = indexData.replace(exportContent, '')
  fs.writeFileSync(indexPath, updatedIndexData)

  // 删除组件在组件列表中的注册信息 componentList.js
  const exportConfigContent = `import ${componentName}Config from '../components/${componentName}/config'`
  const listPath = path.join(targetDir, 'src/meta/componentList.js')
  let listData = fs.readFileSync(listPath, 'utf-8')
  // 使用正则表达式移除对应组件的注册对象
  const updatedListData = listData
    .replace(exportConfigContent, '')
    // 进一步删除组件配置对象在数组中的引用
    .replace(new RegExp(`\\s*${componentName}Config,?\\s*`), ' ')
  fs.writeFileSync(listPath, updatedListData)

  console.log(`组件 ${componentName} 已删除`)
}
