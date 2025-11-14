import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)
// 目标目录
export const targetDir = path.resolve(__dirname, '../../../../apps/web/generator')
