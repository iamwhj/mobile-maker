/**
 * 组件打包工具
 * 打包 packages/components/src 下的组件
 */
import { build } from 'vite'
import fs from 'fs'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import chalk from 'chalk'
import {
  targetDir,
  getComponentNames,
  generateComponentEntries,
} from './utils.js'

// 输出目录
const outputDir = path.resolve(targetDir, './dist')

// 获取所有组件入口
const componentNames = getComponentNames()
const components = generateComponentEntries()

// 全量组件构建
export async function buildComponents() {
  console.log(`开始打包 ${chalk.blue(componentNames.length)} 个组件...`)

  for (const componentName of componentNames) {
    console.log(`正在构建组件: ${componentName}`)
    try {
      await build({
        plugins: [vue()],
        resolve: {
          extensions: ['.js', '.vue'],
        },
        define: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
        build: {
          lib: {
            entry: components[componentName],
            formats: ['es'],
            fileName: 'index',
          },
          rollupOptions: {
            external: ['vue'],
            output: {
              // 组件独立的目录结构
              dir: `${outputDir}/${componentName}`,
              entryFileNames: 'index.js',
              chunkFileNames: 'chunk-[hash].js',
              assetFileNames: (assetInfo) => {
                if (assetInfo.name.endsWith('.css')) {
                  return 'style.css'
                }
                return 'assets/[name]-[hash][extname]'
              },
            },
          },
          emptyOutDir: false, // 重要：不清理整个目录
        },
      })

      console.log(`✅ ${componentName} 构建完成`)
    } catch (error) {
      console.error(`❌ ${componentName} 构建失败:`, error)
    }
  }

  console.log(chalk.green('组件全量构建完成！'))
  // 生成组件索引文件
  generateIndexFile(componentNames)
}

// 单个组件构建
export async function buildComponent(componentName) {
  if (!components[componentName]) {
    console.error(`组件 ${componentName} 不存在！`)
    return
  }

  await build({
    plugins: [vue()],
    resolve: {
      extensions: ['.js', '.vue'],
    },
    build: {
      lib: {
        entry: components[componentName],
        formats: ['es'],
        fileName: 'index',
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          dir: `${outputDir}/${componentName}`,
          entryFileNames: 'index.js',
          chunkFileNames: 'chunk-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'style.css'
            }
            return 'assets/[name]-[hash][extname]'
          },
        },
      },
      emptyOutDir: false,
    },
  })

  console.log(`✅ ${componentName} 构建完成`)
  // 生成组件索引文件
  generateIndexFile(componentName)
}

// 生成组件索引文件
function generateIndexFile(componentName) {
  if (Array.isArray(componentName)) {
    const exports = componentName
      .map((name) => {
        const realComponentName = fs
          .readFileSync(
            `${targetDir}/src/components/${name}/config.js`,
            'utf-8'
          )
          .match(/name:\s*['"`](\w+)['"`]/)[1]
        return `export { default as ${realComponentName} } from './${name}/index.js';`
      })
      .join('\n')
    fs.writeFileSync(`${outputDir}/index.js`, exports)

    const outputIndexDir = path.resolve(outputDir, 'index.js')
    console.log('全量组件索引入口路径：' + `${chalk.blue(outputIndexDir)}`)
  } else {
    console.log(`生成 ${componentName} 组件索引入口文件...`)
    const realComponentName = fs
      .readFileSync(
        `${targetDir}/src/components/${componentName}/config.js`,
        'utf-8'
      )
      .match(/name:\s*['"`](\w+)['"`]/)[1]
    const content = `export { default as ${realComponentName} } from './${componentName}/index.js';\n`
    // 检查索引文件中是否已经存在该组件的导出，不存在则追加
    const indexPath = `${outputDir}/index.js`
    let existingContent = ''
    if (fs.existsSync(indexPath)) {
      existingContent = fs.readFileSync(indexPath, 'utf-8')
    }
    if (!existingContent.includes(content)) {
      fs.appendFileSync(indexPath, content)
      console.log(`${componentName} 组件索引已添加！路径：` + indexPath)
    } else {
      console.log(`${componentName} 组件索引入口已存在，无需重复生成。`)
    }
  }
}
