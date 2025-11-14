import { program } from 'commander'
import chalk from 'chalk'
import { buildComponents, buildComponent } from './components/build.js'
import {
  updateComponentList,
  updateComponentExports,
} from './components/genIndex.js'
import { createComponent } from './components/create.js'
import { deleteComponent } from './components/delete.js'
import { buildGenerator } from './generator/build.js'
import { updateGenerator } from './generator/update.js'
import { buildPlatform } from './platform/build.js'

program.version('1.0.0').description('mobile-maker项目管理脚手架')

program
  .command('platform')
  .description('执行平台相关操作')
  .option('-b, --build', '构建平台')
  .action(async (options) => {
    if (options.build) {
      console.log(chalk.blue('开始构建平台...'))
      await buildPlatform()
      console.log(chalk.green('平台构建完成！'))
    } else {
      program.help() // 如果没有提供具体操作，显示帮助
    }
  })

program
  .command('components')
  .description('执行组件库相关操作')
  .option('-b, --build [component-name]', '构建单个或全部组件')
  .option('-c, --create <name>', '创建一个新的组件模板')
  .option('-i, --index', '生成组件索引文件')
  .option('-d, --delete <name>', '删除指定组件')
  .action(async (options) => {
    try {
      if (options.build) {
        const target = options.build
        if (target === true) {
          console.log(chalk.blue('开始构建全部组件...'))
          await buildComponents()
        } else {
          console.log(chalk.blue(`开始构建组件: ${target}`))
          await buildComponent(target)
        }
        console.log(chalk.green('构建操作执行完毕！'))
      } else if (options.create) {
        console.log(chalk.blue(`开始创建组件: ${options.create}`))
        createComponent(options.create)
        updateComponentExports()
        updateComponentList()
        console.log(chalk.green('组件创建完成！'))
      } else if (options.index) {
        console.log(chalk.blue('开始生成组件索引...'))
        updateComponentExports()
        updateComponentList()
        console.log(chalk.green('组件索引生成完成！'))
      } else if (options.delete) {
        console.log(chalk.blue(`开始删除组件: ${options.delete}`))
        deleteComponent(options.delete)
      } else {
        program.help() // 如果没有提供具体操作，显示帮助
      }
    } catch (error) {
      console.error(chalk.red('操作失败:'), error)
      process.exit(1)
    }
  })

program
  .command('editor')
  .description('执行编辑器相关操作')
  .option('-d, --debug', '调试编辑器')
  .option('-c, --check', '调试应用，用于检查问题')
  .action((options) => {
    if (options.debug) {
      console.log(chalk.blue('启动编辑器调试模式...'))
      // 启动编辑器调试逻辑
    } else if (options.check) {
      console.log(chalk.blue('启动编辑器检查模式...'))
      // 启动编辑器检查逻辑，帮助查bug
    } else {
      program.help() // 如果没有提供具体操作，显示帮助
    }
  })

program
  .command('generator')
  .description('执行生成器相关操作')
  .option('-b, --build', '构建生成器')
  .option('-p, --update', '更新发布生成器')
  .action(async (options) => {
    if (options.build) {
      console.log(chalk.blue('开始构建生成器...'))
      // 启动生成器构建逻辑
      await buildGenerator()
    } else if (options.update) {
      console.log(chalk.blue('开始发布更新生成器...'))
      // 启动生成器更新逻辑
      await updateGenerator()
    } else {
      program.help() // 如果没有提供具体操作，显示帮助
    }
  })

program.parse(process.argv)
