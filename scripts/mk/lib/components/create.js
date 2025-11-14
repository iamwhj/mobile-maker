/**
 * 组件模板创建脚本
 * 创建组件模板到 packages/components/src 文件夹下
 */
import fs from 'fs'
import path from 'path'
import { targetDir } from './utils.js'
import chalk from 'chalk'

export const createComponent = (componentName) => {
  // 组件名称合规检查，不含mk前缀时加上mk前缀，并转化为驼峰
  if (!/^mk[A-Z]/.test(componentName)) {
    componentName = 'mk' + componentName.charAt(0).toUpperCase() + componentName.slice(1)
  }

  // 判断组件名是否存在
  const existingComponents = fs.readdirSync(path.join(targetDir, 'src/components'))
  if (existingComponents.includes(componentName)) {
    console.error(chalk.red(`❌ 组件 ${componentName} 已存在，请使用其他名称。`))
    throw new Error('组件已存在')
  }

  // 组件目录路径
  const componentDir = path.join(targetDir, 'src/components', componentName)

  // 创建组件目录
  fs.mkdirSync(componentDir, { recursive: true })
  // 创建组件源码目录
  fs.mkdirSync(path.join(componentDir, 'src'), { recursive: true })

  // 组件导出文件 index.js
  const indexTemplate = `import { withInstall } from '@mk/utils'
import entry from './src/entry.vue'
import propsForm from './src/propsForm.vue'

export const ${componentName} = withInstall(entry, { propsForm })
export default ${componentName}
`

  fs.writeFileSync(path.join(componentDir, 'index.js'), indexTemplate)

  // 组件信息文件 config.js
  const configTemplate = `import { baseComponent } from '../../meta/category'
    
export default {
  name: '${componentName}', // 组件名称，必须是唯一标识，不能与其他组件重复
  full_name: '${componentName}中文名称', // 组件中文名称
  path: new URL('../../../assets/文字.png', import.meta.url).href, // 组件图标路径
  category: baseComponent, // 组件分类，类目参考 src/meta/category.js
}
`
  fs.writeFileSync(path.join(componentDir, 'config.js'), configTemplate)

  // 组件入口文件 entry.vue
  const entryTemplate = `<script setup>
import { computed } from 'vue'
import config from '../config'

// 必要，使用该名称注册组件
defineOptions({
  name: config.name,
})

// width height 是默认属性，其他动态属性在propsForm.vue中定义配置，然后在这里接收使用
const props = defineProps({
  width: { type: String, default: '240px' },
  height: { type: String, default: '20px' },
  content: { type: String, default: '请输入内容' },
  color: { type: String, default: '' },
  fontSize: { type: String, default: '16px' },
})

// 动态CSS样式
const cssStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
    color: props.color,
    fontSize: props.fontSize,
  }
})
</script>
<template>
  <div class="wrap" :style="cssStyle">{{ content }}</div>
</template>

<style lang="scss" scoped>
.wrap {
  text-overflow: clip;
  overflow: hidden;
}
</style>
`

  fs.writeFileSync(path.join(componentDir, 'src/entry.vue'), entryTemplate)

  // 组件属性配置文件 propsForm.vue
  const propsFormTemplate = `<script setup>
import { reactive, watch } from 'vue'
// 常用的表单配置组件，根据需要引入，也可自行编写
import BaseSetting from '../../../../shared/baseSetting'
import ColorPicker from '../../../../shared/colorPicker'
import BaseInput from '../../../../shared/baseInput'

// updateComponentProps函数用于将表单数据传递给组件
const props = defineProps({
  updateComponentProps: { type: Function },
  content: { type: String, default: '' },
  color: { type: String, default: '#000' },
  fontSize: { type: String, default: '16px' },
})

const form = reactive({
  content: props.content,
  color: props.color,
  fontSize: props.fontSize,
})

// 监听表单数据变化，实时更新到组件属性
watch(form, () => {
  props.updateComponentProps(form)
})
</script>

<template>
  <el-form :model="form">
    <el-form-item label="文字内容：">
      <el-input v-model="form.content" style="width: 230px" placeholder="请输入内容" />
    </el-form-item>
    <el-form-item label="字体颜色：">
      <ColorPicker v-model="form.color" />
    </el-form-item>
    <el-form-item label="字体大小：">
      <BaseInput v-model="form.fontSize" />
    </el-form-item>
  </el-form>
  <BaseSetting></BaseSetting>
</template>

<style lang="scss" scoped></style>
`

  fs.writeFileSync(path.join(componentDir, 'src/propsForm.vue'), propsFormTemplate)

  console.log(chalk.green(`✅ 组件 ${componentName} 模板创建完成，路径：${componentDir}`))
}
