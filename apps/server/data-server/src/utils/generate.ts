import Koa from 'koa'
import Router from '@koa/router'
import { resolve, dirname } from 'path'
import { readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import routesIndex from '../routes'
import GenerateHtml from '../dao/generateHtml'

/**
 * 查找项目根目录或部署根目录
 * 优先级：
 * 1. 向上查找包含 pnpm-workspace.yaml 或根目录 package.json 的目录（开发环境）
 * 2. 使用process.cwd()作为根目录（生产环境）
 * 
 * 这样可以适应不同的部署结构：
 * - 开发环境：在项目根目录运行，找到项目根目录
 * - 生产环境：服务部署在同级目录下
 */
const findProjectRoot = (startPath: string = __dirname): string => {
  let currentDir = resolve(startPath)
  
  // 项目根目录的特征文件
  const rootMarkers = ['pnpm-workspace.yaml', 'package.json']
  
  // 向上查找，最多查找15级，防止无限循环
  let levels = 0
  const maxLevels = 15
  
  // 优先级1: 放到根目录dist文件夹（开发环境）
  while (levels < maxLevels) {
    // 检查当前目录是否包含项目根目录的特征文件
    for (const marker of rootMarkers) {
      const markerPath = resolve(currentDir, marker)
      if (existsSync(markerPath)) {
        // 如果是 package.json，需要检查是否是根目录的 package.json
        if (marker === 'package.json') {
          // 检查同级目录是否有 pnpm-workspace.yaml 或 apps/packages 目录
          const workspaceFile = resolve(currentDir, 'pnpm-workspace.yaml')
          const appsDir = resolve(currentDir, 'apps')
          const packagesDir = resolve(currentDir, 'packages')
          
          if (existsSync(workspaceFile) || (existsSync(appsDir) && existsSync(packagesDir))) {
            // 判断currentDir是否在dist文件夹下，不存在则创建
            const distDir = resolve(currentDir, 'dist')
            if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true })
            return distDir
          }
        } else {
          // 找到 pnpm-workspace.yaml
          // 判断currentDir是否在dist文件夹下，不存在则创建
          const distDir = resolve(currentDir, 'dist')
          if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true })
          return distDir
        }
      }
    }
    
    // 向上移动一级
    const parentDir = dirname(currentDir)
    if (parentDir === currentDir) {
      // 已经到达文件系统根目录
      break
    }
    currentDir = parentDir
    levels++
  }
  
  // 优先级2: 生产环境 - 默认同级目录下创建部署
  const fallbackRoot = process.cwd()
  return fallbackRoot
}

// 路由自动挂载
const router = new Router()
export const generateRouter = (app: Koa, routerPath: string, prefix = ''): void => {
  try {
    if (existsSync(routerPath)) {
      const result = readdirSync(routerPath)
      result.forEach((item) => {
        const current = require(resolve(routerPath, item))
        if (current.routes) {
          router.use(prefix, current.routes(), current.allowedMethods())
        } else if (current.default && current.default.routes) {
          router.use(prefix, current.default.routes(), current.default.allowedMethods())
        }
      })
    } else {
      // Fallback to statically imported routes when bundling packs everything into a single file
      routesIndex.forEach((r) => {
        router.use(prefix, r.routes(), r.allowedMethods())
      })
    }
  } catch {
    // If directory read fails (e.g., after bundling), use statically imported routes
    routesIndex.forEach((r) => {
      router.use(prefix, r.routes(), r.allowedMethods())
    })
  }
  app.use(router.routes()).use(router.allowedMethods())
}

export const generateHtml = async (application: any, publish?: boolean) => {
  const appData = JSON.parse(application.page)
  const appId = application.id

  // 获取html模板
  const generateHtml = new GenerateHtml()
  const htmlRecord: any = await generateHtml.findLatest()
  let htmlTemplate = htmlRecord.html

  // 注入应用数据
  const APP_TITLE = appData.detail.title
  const APP_DATA = `<script> var appData = ${application.page}; var appId = ${appId}; </script>`
  htmlTemplate = htmlTemplate.replace('<!-- APP_TITLE -->', APP_TITLE).replace('<!-- APP_DATA -->', APP_DATA)

  if (publish) {
    // 生成目录结构为：HTML_FOLDER/generatorVersion/appId.html
    const { HTML_FOLDER } = process.env
    const generatorVersion = String(htmlRecord.id)
    const generatorFolder = (HTML_FOLDER as string)
    
    // 动态查找项目根目录，适应不同的部署结构
    const projectRoot = findProjectRoot(__dirname)
    const folderPath = resolve(projectRoot, generatorFolder, generatorVersion)
    const filePath = resolve(folderPath, `${appId}.html`)
    if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true })
    // 应用发布
    writeFileSync(filePath, htmlTemplate, 'utf-8')
  }

  return htmlTemplate
}
