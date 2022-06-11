## 简介

mobile-maker 是搭建一个低代码平台，用于快速制作h5页面。

该项目用于对低代码平台的学习和其中技术点的掌握。

## 项目组成和技术栈

1. 配置服务（front): vue3 + element-plus + webpack
2. 预览服务（preview): vue3 + element-plus + webpack
3. 打包服务（mobile-maker): koa + shell + fs/child_process
4. 接口服务（mobile-maker-server): koa + typescript + mysql

## 项目启动

配置服务（front):
```bash
cd front

npm install 

npm run serve
```

## 进度和规划

目前初步配置服务（front）的视图结构和组件拖拽基本功能。

后续待开发：
1. 组件位置切换和排序
2. 组件删除功能
3. 组件间通信
4. 操作历史记录及回退功能

配置服务弄得差不多后，会逐步完善其他服务，使项目有一个完整链路，即页面配置发布后，手机可立即访问活动页面。

## 配置界面

图片资源均通过网上获取，后经个人切图调整。

![样图1](https://s1.ax1x.com/2022/06/11/XcGyWD.jpg)

![样图2](https://s1.ax1x.com/2022/06/11/XcGsJO.jpg)

## JOIN

如果你对 lowcode 也感觉兴趣的话，请联系我，与我一同完成该项目。

在学习中成长，在实践中掌握。
