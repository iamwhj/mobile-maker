## 简介

mobile-maker 是一个低代码平台，通过拖拽的形式快速制作可交互的h5页面。

该项目寓于加深低代码平台的学习和其中技术点的掌握。  

[![OSCS Status](https://www.oscs1024.com/platform/badge/iamwhj/mobile-maker-server.svg?size=small)](https://www.oscs1024.com/project/iamwhj/mobile-maker-server?ref=badge_small) ![build](https://img.shields.io/github/license/iamwhj/mobile-maker) ![vue](https://img.shields.io/github/languages/top/iamwhj/mobile-maker)

## 项目组成和技术栈

1. 配置服务[(front)](https://github.com/iamwhj/mobile-maker/tree/master/packages/front): vue3 + element-plus + webpack + echarts
2. 预览服务[(preview)](https://github.com/iamwhj/mobile-maker/tree/master/packages/generate): vue3 + element-plus + webpack + echarts
3. 打包服务[(mobile-maker)](https://github.com/iamwhj/mobile-maker): koa + shell + fs/child_process
4. 接口服务[(mobile-maker-server)](https://github.com/iamwhj/mobile-maker-server): koa + typescript + mongodb + fs + child_process/exec

## 服务介绍

1. 配置服务(front)：拖拽生成落地页，将落地页JSON传于后台保存至数据库
2. 预览服务(preview)：提供落地页访问静态资源（js/css），提供移动端适配方案，H5预览
3. 打包服务(mobile-maker)：在线打包front和generate，以及组件上传
4. 接口服务(mobile-maker-server)：包括数据库存储，以及落地页html的生成

## 预览

[在线预览地址](http://121.37.148.236/)  

随便新增修改，但是请不要删除组件 

## 分享文档

1. 【2022/8/4  yuque】第一次分享，[配置服务学习文档](https://www.yuque.com/u21600751/zudomw/qreu1s)

2. 【2022/8/11 wolai】第二次分享，[预览服务学习文档](https://www.wolai.com/6FrBS95zaAw3J53XxGhV89)

3. 【2022/8/21 wolai】第三次分享，[打包服务学习文档](https://www.wolai.com/aRHFJJCeTVpXkQBzokWvzG)

## 优化记录

1. 首屏优化，[优化详细流程](https://juejin.cn/post/7127927760692969509)

## 工作流程图

1. 目录关联逻辑图
![宏观流程图](http://121.37.148.236:3301/image/upload_dd8998d639c6ca84eb4156cdda9e02ba.jpg)

2. 具细化工作流程图
![细化流程图](http://121.37.148.236:3301/image/upload_79e3455c3d126b02e7eaef6d7874b2ff.jpg)  

图是项目设计之初画的，有不清楚的链路也可以问我，下方加 VX。  
觉得项目有帮助的话，可以点个 star。

## 近期计划表

- [ ] 基础容器组件
- [ ] 打包、回滚流程优化
- [ ] 在线开发组件，在线上传（后续重心在这）

## 项目展示

图片模型资源均通过网上获取。

![样图1](http://121.37.148.236:3301/image/upload_4097da3388e3a7181d9a25d6989d2ad1.jpg)

![样图2](http://121.37.148.236:3301/image/upload_5f0d272f30c7a3c34652dbf659f48260.jpg)

![样图3](http://121.37.148.236:3301/image/upload_2e830adbd448d3a6272cc2a455e28d67.jpg)


## 里程碑

【2022/7/19】完成整套低代码平台架构功能，包括上面的四个服务，还有三个基础的组件，以及额外需要的图床服务(防止滥传，加了ip名单限制，可找我开通)。  

## 联系

微信：wx962983053

## JOIN

如果你对相关的内容也感觉兴趣的话，可以一同参与到该项目中。
