import fs from 'fs'
import path from 'path'
import { targetDir } from './utils.js'
import { saveHtml, getHtml } from '@mk/api'
import chalk from 'chalk'

export async function updateGenerator() {
  const htmlRecord = await getHtml()
  const version = htmlRecord ? htmlRecord.data.data.id + 1 : 1
  const generatorName = 'prod_app'
  const generatorVersion = String(version)
  const outputDir = path.resolve(targetDir, generatorName, generatorVersion)
  try {
    const html = fs.readFileSync(
      path.resolve(outputDir, './index.html'),
      'utf-8'
    )
    await saveHtml({ html })
    console.log(
      chalk.green(`生成器发布更新完成，版本号：${chalk.redBright(version)}`)
    )
  } catch (err) {
    console.log(
      chalk.red(
        `找不到prod_app_${version}文件夹下的index.html，请先运行 npx mk generator -b 打包成功后再试！`
      )
    )
  }
}
