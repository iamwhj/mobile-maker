### 配置端

mobile-maker低代码平台落地页配置服务，通过组件拖拽组合生成落地页，将页面的描述信息（JSON）保存。

### 技术栈

Vue3全家桶、Element-plus组件库、css预处理语言Sass

### 运行

```bash
npm install

npm run dev
```
### 组件开发

示例：按钮组件（vButton）

1. custom-components目录下创建vButton文件夹，组件目录如下：

-- component
---- index.vue
-- config
---- index.vue  

这是组件固定入口目录，其他的可自行在组件目录内扩展

- updateCompDeail，config/index.vue自动注入该函数，用于同步配置数据到组件中

- clickChock，component/index.vue自动注入该函数，用于统一处理和派发点击事件

2. custom-components目录中修改 index.js 注册组件 vButton

3. 组件上传，将 vButton 目录压缩成zip文件上传，本地环境上传完成后立即能使用，线上环境需要等待几分钟（rebuild）后可使用

### 组件更新记录

2022/7/16
【v1.0.0】(第一版组件)

===基础组件===  
1. 文字组件：文字内容、字体颜色、字体大小
2. 按钮组件：按钮文字、字体颜色、背景颜色、按钮圆角、点击事件
3. 图片组件：上传图片、点击事件