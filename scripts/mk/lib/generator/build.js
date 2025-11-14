/**
 * 组件打包工具
 * 打包 packages/components/src 下的组件
 */
import { build } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { targetDir } from './utils.js'
import { promises as fsp } from 'fs'
import { getHtml } from '@mk/api'
import chalk from 'chalk'

// 项目构建
export async function buildGenerator() {
  const htmlRecord = await getHtml()
  const version = htmlRecord ? htmlRecord.data.data.id + 1 : 1

  // 输出目录
  const generatorVersion = String(version)
  const generatorName = 'prod_app'

  const outputDir = path.resolve(targetDir, generatorName, generatorVersion)

  try {
    await build({
      base: './',
      plugins: [
        vue(),
        AutoImport({
          resolvers: [ElementPlusResolver()],
          dts: 'types/auto-imports.d.ts',
        }),
        Components({
          resolvers: [ElementPlusResolver()],
          dts: 'types/components.d.ts',
        }),
      ],
      resolve: {
        extensions: ['.js', '.vue'],
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
      build: {
        outDir: outputDir,
        rollupOptions: {
          external: ['vue'],
          input: {
            index: path.resolve(targetDir, 'index.html'),
          },
          output: {
            manualChunks: (id) => {
              if (id.includes('utils/constant.js')) {
                return 'constant'
              }
            },
            entryFileNames: 'static/[name]-[hash].js',
            chunkFileNames: 'static/[name]-[hash].js',
            assetFileNames: 'static/[name]-[hash].[ext]',
          },
        },
      },
    })

    // 目录修正，index.html 会被输出在嵌套目录（prod_app_version/apps/web/generator/index.html）
    // 目标是将 index.html 移动到 outputDir 根下，尝试了多种修改打包配置的修复办法都无法实现，最终只能fs移动文件
    try {
      // 递归查找输出目录中第一个不是根目录的 index.html
      async function findNestedIndex(dir) {
        const entries = await fsp.readdir(dir, { withFileTypes: true })
        for (const e of entries) {
          const p = path.join(dir, e.name)
          if (e.isDirectory()) {
            const found = await findNestedIndex(p)
            if (found) return found
          } else if (e.isFile() && e.name === 'index.html') {
            // 如果是根目录下的 index.html，跳过
            if (path.resolve(dir) === path.resolve(outputDir)) continue
            return p
          }
        }
        return null
      }

      const nestedIndex = await findNestedIndex(outputDir)
      if (nestedIndex) {
        const html = await fsp.readFile(nestedIndex, 'utf8')
        // 把指向静态资源的相对上级路径（如 ../../.. /static/）替换为 ./static/
        const fixed = html.replace(/(?:\.\.\/)+static\//g, 'static/')

        // Vue 作为外部依赖，通过 import map 从 CDN 加载(这个Vue CDN 首次加载 6~7秒，导致首屏白屏太久)
        // import map 必须在所有 module script 之前
        const importMap = `<!-- Import Map for Vue - 必须在所有 module script 之前 -->
    <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3.5.24/dist/vue.esm-browser.prod.js"
      }
    }
    </script>`

        // 在第一个 <script type="module"> 之前插入 import map
        // 如果没有找到，则在 </head> 之前插入
        let htmlWithImportMap = fixed
        const moduleScriptMatch = fixed.match(/<script\s+type=["']module["']/i)
        if (moduleScriptMatch) {
          // 在第一个 module script 之前插入
          htmlWithImportMap = fixed.replace(
            /<script\s+type=["']module["']/i,
            importMap + '\n    $&'
          )
        } else {
          // 如果没有 module script，则在 </head> 之前插入
          htmlWithImportMap = fixed.replace(
            '</head>',
            importMap + '\n  </head>'
          )
        }

        // html 头部插入版本号注释
        const versionComment = `<!-- VERSION: ${version} FOLDER: ${generatorName}/${generatorVersion} --> \n`

        // 确保写入 outputDir 根下的 index.html
        const rootIndex = path.join(outputDir, 'index.html')
        await fsp.writeFile(
          rootIndex,
          versionComment + htmlWithImportMap,
          'utf8'
        )
        // 删除嵌套的 index.html
        await fsp.unlink(nestedIndex)
        // 删除嵌套目录
        await fsp.rmdir(path.resolve(outputDir, 'apps'), { recursive: true })

        const outputFolder = `${generatorName}/${generatorVersion}`
        console.log(
          `✅ generator构建完成，版本号：${chalk.redBright(generatorVersion)}，目录：${chalk.blue(outputFolder)}`
        )
      }
    } catch (err) {
      console.warn('⚠️ 构建后处理 index.html 失败:', err)
    }
    return version
  } catch (error) {
    console.error(`❌ 构建失败:`, error)
  }
}
