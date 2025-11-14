### Component development

The MK CLI management components

1. npx mk components -c [componentName] create component template

2. npx mk components -i update components index

3. npx mk components -b [componentName] build component

### 创建组件

1. 创建组件开发模板

npx mk components -c 组件名称

如创建demo组件：npx mk components -c demo

### 组件索引文件更新

当创建新组件时，希望editor可以使用，需要在 packages/components/src/meta/componentList.js 中添加组件信息，editor左侧组件拖拽栏才能读取得到新组件

1. 更新组件注册信息

npx mk components -i

### 组件打包

1. 组件全量打包

npx mk components -b

2. 单个组件打包

全量打包命名后面加上组件名称，如打包button组件：npx mk components -b button
