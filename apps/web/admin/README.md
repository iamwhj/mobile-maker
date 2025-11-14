### 配置端

mobile-maker低代码平台落地页配置服务，通过组件拖拽组合生成落地页，将页面的描述信息（JSON）保存。

### 技术栈

Vue3全家桶、Element-plus组件库、css预处理语言Sass、可视化库Echarts

### 运行

进入 ./packages/front 目录

```bash
npm install

// 测试环境服务（推荐）
npm run dev:test

or

// 本地环境（需要本地跑接口服务）
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

- updateComponentProps，config/index.vue自动注入该函数，用于同步配置数据到组件schema中，刷新渲染视图

- clickChock（选用），component/index.vue自动注入该函数，用于统一处理和派发点击事件  

注入函数的使用方式可以参考别的组件

2. custom-components 目录中修改 index.js 将组件 vButton 注册

```js
import Button from './vButton/component';
import ButtonConfig from './vButton/config';

const registerCustomComponents = (Vue) => {
  // ...... 若干组价注册代码
  Vue.component('vButton', Button);
  Vue.component('vButtonConfig', ButtonConfig);
};

export default registerCustomComponents;
```

3. 组件上传，将 vButton 目录压缩成zip文件，在平台组件管理中上传。

  - 组件名称：vButton （需要与创建的组件文件夹名称相同）
  
  - 组件图标：需要填写图片链接（没有没关系，给你几个示例，直接用）

示例图标-计时：http://81.68.197.70:3301/image/upload_7225757ecd93699ab9c376fd67338ec9.png

示例图标-日期：http://81.68.197.70:3301/image/upload_d1ed5a280c53ef8f9ba05bfdb26eaa5b.png

### 优势

1. 组件上传功能：相比常规的低代码平台，我们额外多一个打包服务，用于支持组件上传在线打包功能，用户业务方也能自主上传定制组件，减轻平台开发方的负担。并且上传组件具有较高的灵活性，可使用其他资源扩展第三方类库，只要将资源和你的组件放到同一个目录即可。

### 优化

1. 【2022/8/4】性能优化：首屏优化，减小文件体积，白屏时间减少80%。

### 组件更新记录

2022/7/16
【v1.0.0】(第一版组件更新)

===基础组件【新增】===  
1. 文字组件：文字内容、字体颜色、字体大小
2. 按钮组件：按钮文字、字体颜色、背景颜色、按钮圆角、点击事件
3. 图片组件：上传图片、点击事件  

2022/7/26
【v1.0.1】(第二版组件更新)

===图表组件【新增】===  
1. 饼图组件：可编辑式图表数据、图例开关、内环半径、外环半径

===基础组件【修复】===  
1. 图片组件：属性配置 -> 上传 -> 修复上传icon错位  