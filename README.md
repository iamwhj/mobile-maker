## 简介

mobile-maker 是一个低代码平台，通过拖拽的形式快速制作可交互的h5页面。

该项目寓于加深低代码平台的学习和其中技术点的掌握。  

[![OSCS Status](https://www.oscs1024.com/platform/badge/iamwhj/mobile-maker-server.svg?size=small)](https://www.oscs1024.com/project/iamwhj/mobile-maker-server?ref=badge_small) ![build](https://img.shields.io/github/license/iamwhj/mobile-maker) ![vue](https://img.shields.io/github/languages/top/iamwhj/mobile-maker)

## 项目组成和技术栈

1. 配置服务[(front)](https://github.com/iamwhj/mobile-maker/tree/master/packages/front): vue3 + element-plus + webpack
2. 预览服务[(preview)](https://github.com/iamwhj/mobile-maker/tree/master/packages/generate): vue3 + element-plus + webpack
3. 打包服务[(mobile-maker)](https://github.com/iamwhj/mobile-maker): koa + shell + fs/child_process
4. 接口服务[(mobile-maker-server)](https://github.com/iamwhj/mobile-maker-server): koa + typescript + mongodb + fs + child_process/exec

## 服务介绍

1. 配置服务(front)：拖拽生成落地页，将落地页JSON传于后台保存至数据库
2. 预览服务(preview)：提供落地页访问静态资源（js/css），提供移动端适配方案，H5预览
3. 打包服务(mobile-maker)：在线打包front和generate，以及组件上传
4. 接口服务(mobile-maker-server)：包括数据库存储，以及落地页html的生成

## 工作流程图

![宏观流程图]()

![细化流程图]()

## 项目展示

图片资源均通过网上获取，后经个人切图调整。

![样图1](https://s1.ax1x.com/2022/07/05/jtvfAJ.jpg)

![样图2](https://s1.ax1x.com/2022/07/05/jtvjNd.jpg)

## 里程碑

【2022/7/19】完成整套低代码平台架构功能，包括上面的四个服务，还有三个基础的组件，以及额外需要的图床服务。  

## JOIN

如果你对相关的内容也感觉兴趣的话，可以一同参与到该项目中。
