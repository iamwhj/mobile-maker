## 简介

mk 命令行脚手架工具，用于打包和协调各个系统模块

## 命令

### components

1. 创建组件

```bash
# 创建组件，如 npx mk components -c demo
npx mk components -c <name>
```

2. 打包组件

```bash
# 全部组件打包
npx mk components -b

# 单个组件打包，如 npx mk components -b button
npx mk components -b [component-name]
```

3. 生成组件索引文件

组件索引文件  
packages\components\src\components\index.js 组件导出，用于组件使用
packages\components\src\meta\componentList.js 组件信息导出，用于左侧组件拖拽栏显示

```bash
npx mk components -i
```

### generator

```bash
# 打包应用发布模板代码
npx mk generator -b

# 更新发布应用模板代码
npx mk generator -p
```

### editor
