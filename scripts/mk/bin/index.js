#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { existsSync } from 'node:fs'
import dotenvx from '@dotenvx/dotenvx'

const __dirname = dirname(fileURLToPath(import.meta.url))
const NODE_ENV = process.env.NODE_ENV ?? 'development'

const envFileMap = {
  production: '.env.production',
  test: '.env.test',
  development: '.env.development',
}

const envFile = envFileMap[NODE_ENV] ?? `.env.${NODE_ENV}`

const envPaths = [
  resolve(__dirname, `../${envFile}`),
  resolve(__dirname, '../.env'),
]

envPaths.forEach((filePath) => {
  if (existsSync(filePath)) {
    dotenvx.config({ path: filePath })
  }
})

// 此处为执行脚本代码，上面为加载环境变量文件
import('../lib/index.js')
