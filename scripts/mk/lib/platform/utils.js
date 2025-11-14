import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

// 项目根目录
export const rootDir = resolve(__dirname, '../../../../')

// 输出目录
export const outputDir = resolve(rootDir, 'dist')

// 模块目录
export const adminDir = resolve(rootDir, 'apps/web/admin')
export const generatorDir = resolve(rootDir, 'apps/web/generator')
export const componentsDir = resolve(rootDir, 'packages/components')
export const dataServerDir = resolve(rootDir, 'apps/server/data-server')
