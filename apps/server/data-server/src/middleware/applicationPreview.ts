import { Next, ParameterizedContext } from 'koa'
import { resolve } from 'path'
import { readFileSync, existsSync } from 'fs'
import GenerateHtml from '../dao/generateHtml'

// 处理应用预览的静态资源
async function applicationPreview(ctx: ParameterizedContext, next: Next) {
  if (ctx.path.startsWith('/application/preview/static/')) {
    try {
      // 提取静态资源文件路径（移除前缀 /application/preview/static/）
      const filePath = ctx.path.replace('/application/preview/static/', '')
      
      // 获取最新的 HTML 记录版本
      const generateHtmlDao = new GenerateHtml()
      const htmlRecord: any = await generateHtmlDao.findLatest()
      
      if (!htmlRecord) {
        ctx.status = 404
        ctx.body = 'HTML record not found'
        return
      }
      
      const version = String(htmlRecord.id)
      const dataServerDir = resolve(__dirname, '../')
      
      // 尝试路径1: 生产环境路径 path.resolve(data-server, '../', 'prod_app', 'version')
      const prodStaticPath = resolve(dataServerDir, '../../', 'prod_app', version, 'static', filePath)
      
      // 尝试路径2: 开发环境路径 读取 apps/web/generator/prod_app/version
      const devStaticPath = resolve(dataServerDir, '../../../', 'web/generator/prod_app', version, 'static', filePath)
      
      let fileContent: Buffer | null = null
      
      if (existsSync(prodStaticPath)) {
        fileContent = readFileSync(prodStaticPath)
      } else if (existsSync(devStaticPath)) {
        fileContent = readFileSync(devStaticPath)
      }
      
      if (!fileContent) {
        ctx.status = 404
        ctx.body = 'Static resource not found'
        return
      }
      
      // 设置 Content-Type 根据文件扩展名
      const ext = filePath.split('.').pop()?.toLowerCase()
      const mimeTypes: { [key: string]: string } = {
        'js': 'application/javascript',
        'css': 'text/css',
        'html': 'text/html',
        'json': 'application/json',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'ico': 'image/x-icon',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'ttf': 'font/ttf',
        'eot': 'application/vnd.ms-fontobject'
      }
      
      const contentType = mimeTypes[ext || ''] || 'application/octet-stream'
      ctx.set('Content-Type', contentType)
      ctx.body = fileContent
      return
    } catch (error: any) {
      ctx.status = 500
      ctx.body = error.message || 'Internal server error'
      return
    }
  }

  // 处理组件资源
  if (ctx.path.startsWith('/components/')) {
    try {
      const filePath = ctx.path.replace('/components/', '')

      const dataServerDir = resolve(__dirname, '../')
        
      // 尝试路径1: 生产环境路径 
      const prodStaticPath = resolve(dataServerDir, '../../', 'components', filePath)

      // 尝试路径2: 开发环境路径 
      const devStaticPath = resolve(dataServerDir, '../../../../', 'packages/components', 'dist', filePath)
      
      let fileContent: Buffer | null = null
        
      if (existsSync(prodStaticPath)) {
        fileContent = readFileSync(prodStaticPath)
      } else if (existsSync(devStaticPath)) {
        fileContent = readFileSync(devStaticPath)
      }

      if (!fileContent) {
        ctx.status = 404
        ctx.body = 'Static resource not found'
        return
      }

      ctx.set('Content-Type', 'application/javascript')
      ctx.body = fileContent
    return
    } catch (error: any) {
      ctx.status = 500
      ctx.body = error.message || 'Internal server error'
      return
    }
  }
  
  await next()
}

export default applicationPreview
