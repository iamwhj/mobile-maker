/**
 * 平台打包工具
 * 将各个模块的打包产物整合到根目录，构建部署目录结构
 */
import path from 'path'
import fs from 'fs-extra'
import util from 'util'
import childProcess from 'child_process'
import chalk from 'chalk'
import { getHtml } from '@mk/api'
import { buildGenerator } from '../generator/build.js'
import { buildComponents } from '../components/build.js'
import {
  outputDir,
  adminDir,
  generatorDir,
  componentsDir,
  dataServerDir,
} from './utils.js'

const exec = util.promisify(childProcess.exec)

export async function buildPlatform() {
  // 1、打包阶段
  // data-server 打包
  console.log(chalk.blue('data-server打包中....'))
  await exec('npm run build:prod', { cwd: dataServerDir, encoding: 'utf8' })
  console.log(chalk.green('data-server打包完成！'))
  // admin 打包
  console.log(chalk.blue('admin打包中....'))
  await exec('npm run build:prod', { cwd: adminDir, encoding: 'utf8' })
  console.log(chalk.green('admin打包完成！'))
  // generator 打包
  await buildGenerator()
  // components 打包
  await buildComponents()

  // 2、输出阶段

  // 创建输出目录
  await fs.ensureDir(outputDir)

  // data-server 模块
  const dataServerOutputDir = path.resolve(dataServerDir, 'dist')
  await fs.copy(dataServerOutputDir, path.resolve(outputDir, 'data-server'))

  // admin 模块
  const adminOutputDir = path.resolve(adminDir, 'dist')
  await fs.copy(adminOutputDir, path.resolve(outputDir, 'admin'))

  // generator 模块
  const generatorName = 'prod_app'
  const htmlRecord = await getHtml()
  const version = htmlRecord ? htmlRecord.data.data.id + 1 : 1
  const generatorVersion = String(version)
  const generatorOutputDir = path.resolve(
    generatorDir,
    generatorName,
    generatorVersion
  )
  await fs.copy(
    generatorOutputDir,
    path.resolve(outputDir, generatorName, generatorVersion)
  )

  // components 模块
  const componentsOutputDir = path.resolve(componentsDir, 'dist')
  await fs.copy(componentsOutputDir, path.resolve(outputDir, 'components'))
}
