## 简介

mobile-maker 是一个低代码平台，通过拖拽的形式快速制作可交互的h5页面。

该项目寓于加深低代码平台的学习和其中技术点的掌握，有意者可加下方微信联系。  

目前重心在于探索实现核心功能方案，细节方面打磨欠缺，有问题可放 issue。  

[![OSCS Status](https://www.oscs1024.com/platform/badge/iamwhj/mobile-maker-server.svg?size=small)](https://www.oscs1024.com/project/iamwhj/mobile-maker-server?ref=badge_small) ![build](https://img.shields.io/github/license/iamwhj/mobile-maker) ![vue](https://img.shields.io/github/languages/top/iamwhj/mobile-maker)

## 项目组成和技术栈

1. 配置服务[(front)](https://github.com/iamwhj/mobile-maker/tree/master/packages/front): vue3 + element-plus + webpack + echarts
2. 预览服务[(generate)](https://github.com/iamwhj/mobile-maker/tree/master/packages/generate): vue3 + element-plus + webpack + echarts
3. 打包服务[(mobile-maker)](https://github.com/iamwhj/mobile-maker): koa + shell + fs/child_process
4. 接口服务[(mobile-maker-server)](https://github.com/iamwhj/mobile-maker-server): koa + typescript + mongodb + fs + child_process/exec

## 服务介绍

1. 配置服务(front)：拖拽生成落地页，将落地页JSON传于后台保存至数据库
2. 预览服务(generate)：提供落地页访问静态资源（js/css），提供移动端适配方案，H5预览
3. 打包服务(mobile-maker)：在线打包front和generate，以及组件上传
4. 接口服务(mobile-maker-server)：包括数据库存储，以及落地页html的生成

## 预览

[在线预览地址](http://81.68.197.70/)  

随便新增修改，但是请不要删除组件 

## 运行

【2022/8/23】完成测试环境搭建，运行配置服务不需要跑接口服务了，直连测试库。

```bash
// 配置服务（直连测试环境，无需跑接口）

cd ./packages/front

npm install

npm run dev:test
```
想上手尝试开发一个组件吗？[请点击这里](https://github.com/iamwhj/mobile-maker/tree/master/packages/front)

## 目录结构

1. mobile-maker 打包服务

    - 配置服务：./packages/front 

    - 预览服务：./packages/generate 

2. mobile-maker-server 接口服务

3. drawingBed 图床服务

## 分享文档

1. 【2022/8/4  yuque】第一次分享，[配置服务学习文档](https://www.yuque.com/u21600751/zudomw/qreu1s)

2. 【2022/8/11 yuque】第二次分享，[预览服务学习文档](https://www.yuque.com/u21600751/zudomw/qb77op)

3. 【2022/8/21 yuque】第三次分享，[打包服务学习文档](https://www.yuque.com/u21600751/zudomw/zagfh2)

## 优化记录

1. 首屏优化，[优化详细流程](https://juejin.cn/post/7127927760692969509)

## 工作流程图

1. 目录层级关联逻辑图
![宏观流程图](http://81.68.197.70:3301/image/upload_bde066f0014066a792c582e702926d62.jpg)

2. 具细化工作流程图
![细化流程图](http://81.68.197.70:3301/image/upload_559263cd06595d521546ebf32ec91d57.jpg)  

图是项目设计之初画的，有不清楚的链路也可以问我，下方加 VX。  
觉得项目有帮助的话，可以点个 star。

## 近期计划表

- [ ] 基础容器组件
- [ ] 打包、回滚流程优化
- [ ] 在线开发组件，在线上传（后续重心在这）

## 项目展示

图片模型资源均通过网上获取。

![样图1](http://81.68.197.70:3301/image/upload_1e4e3d090c444467dc094c24d73ce052.jpg)

![样图2](http://81.68.197.70:3301/image/upload_91f58ea351c9833684c7a1b4a34e389d.jpg)

![样图3](http://81.68.197.70:3301/image/upload_d98a767ccbd2ecd778e516a74952d811.jpg)


## 里程碑

【2022/7/19】完成整套低代码平台架构功能，包括上面的四个服务，还有三个基础的组件，以及额外需要的图床服务(防止滥传，加了ip名单限制，可找我开通)。   

【2022/8/24】完成三个核心模块分享（联合杨村长B站直播间，历经三周，周/次），域名备案通过升级部署服务器，平台总访问500+，star数 40，确定两个后续开发方向：1、组件在线开发；2、组件远程加载。  

## 联系

微信：wx962983053

## JOIN

如果你对相关的内容感觉兴趣的话，可以与我一同探讨。
