/**
 * 构建后处理脚本
 * 用于组织构建输出文件，实现懒加载和按需加载的文件结构
 */

const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

class BuildPostProcessor {
  constructor() {
    this.rootDir = path.resolve(__dirname, '..')
    this.distDir = path.join(this.rootDir, 'dist')
  }

  /**
   * 执行构建后处理
   */
  async process() {
    console.log('🚀 Starting build post-processing...')
    
    try {
      // 清理旧的 dist 目录
      await this.cleanDist()
      
      // 处理 Admin 构建输出
      await this.processAdminBuild()
      
      // 处理 Editor 构建输出
      await this.processEditorBuild()
      
      // 处理 Generator 构建输出
      await this.processGeneratorBuild()
      
      // 处理 Components 构建输出
      await this.processComponentsBuild()
      
      // 创建入口文件
      await this.createEntryFiles()
      
      console.log('✅ Build post-processing completed!')
    } catch (error) {
      console.error('❌ Build post-processing failed:', error)
      process.exit(1)
    }
  }

  /**
   * 清理 dist 目录
   */
  async cleanDist() {
    if (await fs.pathExists(this.distDir)) {
      await fs.remove(this.distDir)
    }
    await fs.ensureDir(this.distDir)
  }

  /**
   * 处理 Admin 构建输出
   */
  async processAdminBuild() {
    const adminDistDir = path.join(this.rootDir, 'apps/web/admin/dist')
    if (await fs.pathExists(adminDistDir)) {
      await fs.copy(adminDistDir, path.join(this.distDir, 'admin'))
      console.log('📁 Processed admin build output')
    }
  }

  /**
   * 处理 Editor 构建输出
   */
  async processEditorBuild() {
    const editorDistDir = path.join(this.rootDir, 'apps/web/editor/dist')
    if (await fs.pathExists(editorDistDir)) {
      await fs.copy(editorDistDir, path.join(this.distDir, 'editor'))
      console.log('📁 Processed editor build output')
    }
  }

  /**
   * 处理 Generator 构建输出
   */
  async processGeneratorBuild() {
    const generatorDistDir = path.join(this.rootDir, 'apps/web/generator/dist')
    if (await fs.pathExists(generatorDistDir)) {
      await fs.copy(generatorDistDir, path.join(this.distDir, 'generator'))
      console.log('📁 Processed generator build output')
    }
  }

  /**
   * 处理 Components 构建输出
   */
  async processComponentsBuild() {
    const componentsDistDir = path.join(this.rootDir, 'packages/components/dist')
    if (await fs.pathExists(componentsDistDir)) {
      await fs.copy(componentsDistDir, path.join(this.distDir, 'components'))
      console.log('📁 Processed components build output')
    }
  }

  /**
   * 创建入口文件
   */
  async createEntryFiles() {
    // 创建主入口文件
    const mainEntryContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mobile Maker</title>
  <link rel="icon" href="/favicon.ico">
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/admin/index.html"></script>
</body>
</html>
`
    await fs.writeFile(path.join(this.distDir, 'index.html'), mainEntryContent)

    // 动态获取组件清单
    const ComponentDiscovery = require('./component-discovery.js')
    const discovery = new ComponentDiscovery()
    const componentNames = discovery.getComponentNames()
    
    const componentManifest = {
      components: componentNames,
      entryPoints: {
        admin: '/admin/',
        editor: '/editor/mk-editor.es.js',
        generator: '/generator/mk-generator.es.js'
      }
    }
    
    await fs.writeFile(
      path.join(this.distDir, 'manifest.json'), 
      JSON.stringify(componentManifest, null, 2)
    )

    console.log('📄 Created entry files and manifest')
  }
}

// 执行构建后处理
if (require.main === module) {
  const processor = new BuildPostProcessor()
  processor.process()
}

module.exports = BuildPostProcessor
