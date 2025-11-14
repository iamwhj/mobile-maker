## Generate

generator服务，用途：1 预览应用；2 打包为应用发布模板，发布时通过html锚点注入应用数据

## 移动端适配规则

1. 设计稿宽度：240px  

2. 将设计稿分成20份，每份就是 240px / 20 = 12px

3. 所以 1rem = 12px, 组件撑满屏宽就是 20rem = 240px

4. 切换机型根据实宽计算1rem等于的px，实宽 / 20 = ?px = 1rem 

## 组件设计规则

组件宽度：

1. 撑满屏宽 240px

2. 一半屏宽 120px

3. 三分一屏宽 80px  

组件设计只需要按照 0~240（撑满屏幕）的区间设定组件宽度

## 渲染

Generate会统一的对px转换成rem，更好的适配各种机型。  

活动数据activity会通过入口index.html注入。

## 数据注入

1. 预览功能：通过export.js为入口，将需要预览的应用appData传入，存至Vue全局属性

2. 发布功能：打包index.html入口，将打包文件作为发布模板，发布时将appData替换到html中锚点

## 开发调试

public/index.html 注释<!-- ACTIVITY_DATA -->处，添加需要调试的活动页面数据，如：

```html
<script>
var appData = {"components":[{"name":"vButton","fullName":"按钮","mark":"vButton-1656039369240","detail":{},"style":{"width":240,"height":28,"align":"left"}},{"name":"vImage","fullName":"图片","mark":"vImage-1656039369993","detail":{},"style":{}}],"detail":{"name":"hello world","title":"活动页","date":["2022-06-23T16:00:00.000Z","2022-06-29T16:00:00.000Z"]},"mark":"activity-1656039363409"}
</script>
```

活动数据可以通过控制台Elements获取，预览 -> iframe -> body -> 复制