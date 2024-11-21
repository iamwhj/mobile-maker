## 简介

mobile-maker 是一个低代码搭建平台，拖拽快速制作可交互的 H5落地页。

该项目着重于探究低代码平台核心功能，具备完整低代码平台生产链路（编辑-预览-发布），可在线打包组件，但其并未实现太多的业务功能，非常适合作为低代码平台入门学习项目。

如果对你有帮助的话，请顺手点个 star，这将给予我极大的鼓励。

[![OSCS Status](https://www.oscs1024.com/platform/badge/iamwhj/mobile-maker-server.svg?size=small)](https://www.oscs1024.com/project/iamwhj/mobile-maker-server?ref=badge_small) ![build](https://img.shields.io/github/license/iamwhj/mobile-maker) ![vue](https://img.shields.io/github/languages/top/iamwhj/mobile-maker)

## 界面

![编辑界面](https://github.com/iamwhj/picx-images-hosting/raw/master/mobile-maker/mobile-maker.77dl4d3bij.webp)

## 文档

开发文档：  

- [编辑服务开发文档](https://github.com/iamwhj/mobile-maker/blob/master/packages/front/README.md)

- [预览服务开发文档](https://github.com/iamwhj/mobile-maker/blob/master/packages/generate/README.md)

## 运行

mobile-maker项目
```bash
// 进入编辑服务
cd ./packages/front

// 安装依赖
yarn

yarn dev
```

mobile-maker-server项目  

确保你的环境有mongoDB，没有就需要先安装
```bash
yarn

yarn dev
```

## 项目结构

```base
- mobile-maker 打包服务
    - 编辑服务：./packages/front 
    - 预览服务：./packages/generate 

- mobile-maker-server 接口服务 
```

1. 打包服务[(mobile-maker)](https://github.com/iamwhj/mobile-maker): 通过该服务实现组件在线上传打包，技术栈：koa + shell + fs/child_process
2. 编辑服务[(front)](https://github.com/iamwhj/mobile-maker/tree/master/packages/front): 拖拽生成落地页，将落地页JSON传于后台保存至数据库，技术栈：vue3 + element-plus + webpack + echarts
3. 预览服务[(generate)](https://github.com/iamwhj/mobile-maker/tree/master/packages/generate): 提供落地页访问静态资源（js/css），提供移动端适配方案，H5预览，技术栈：vue3 + element-plus + webpack + echarts
4. 接口服务[(mobile-maker-server)](https://github.com/iamwhj/mobile-maker-server): 数据库存储，以及落地页html的生成，技术栈：koa + typescript + mongodb + fs + child_process/exec

## 分享文档

联合杨村长做的B站直播分享。

1. 【2022/8/4】第一次分享，[编辑服务学习文档](https://www.yuque.com/u21600751/zudomw/qreu1s)

2. 【2022/8/11】第二次分享，[预览服务学习文档](https://www.yuque.com/u21600751/zudomw/qb77op)

3. 【2022/8/21】第三次分享，[打包服务学习文档](https://www.yuque.com/u21600751/zudomw/zagfh2)

## 优化记录

1. 首屏优化，[博文地址](https://juejin.cn/post/7127927760692969509)

## 里程碑

【2022/7/19】完成整套低代码平台架构功能，包括上面的四个服务，还有三个基础的组件，以及额外需要的图床服务(ip名单限制)

【2022/8/24】完成三个核心模块分享（B站的直播分享，历经三周，每周一次），域名备案通过升级部署服务器，平台访问量1k+，star数 40+

【2024/11/21】进行若干优化后，V1版本的迭代告一段落，此版本会打一个Tag版本v1.0.0，该版本的初衷在于学习理解低代码核心逻辑，降低初入门者的学习门槛。新版本计划架构重写，1.平台方面抽出平台和编辑器，实现绝对定位画布 2.组件方面实现远程组件，不再使用在线打包 3.功能方面实现组件嵌套和组件树 4.基于抽出的编辑器实现组件开发脚手架 

## ENJOY

如果你对相关的内容感觉兴趣的话，可以与我一同探讨。

微信：wx962983053
