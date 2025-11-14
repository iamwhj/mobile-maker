<div align="center">
  <a href="https://github.com/iamwhj/mobile-maker">
    <img alt="Mobile Maker Logo" width="215" src="apps/web/admin/public/lowcode.png">
  </a>
  <br>
  <br>

[![license](https://img.shields.io/github/license/iamwhj/mobile-maker.svg)](LICENSE)

  <h1>Mobile Maker</h1>
  <h3>低代码平台 - 快速构建交互式 H5 页面</h3>
</div>

[![license](https://img.shields.io/github/license/iamwhj/mobile-maker.svg)](LICENSE) [![vue](https://img.shields.io/github/languages/top/iamwhj/mobile-maker.svg)](https://github.com/iamwhj/mobile-maker) [![pnpm](https://img.shields.io/badge/pnpm-8.0+-orange.svg)](https://pnpm.io/)

[English](./README.md) | **中文**

## 简介

Mobile Maker 是一个免费开源的低代码平台，通过拖拽的方式快速制作可交互的 H5 页面。该项目基于monorepo架构搭建，各个模块间逻辑结构清晰，具备完整的低代码平台生产链路（编辑-预览-发布），快速上手开发，非常适合作为低代码平台基础搭建项目。

## 设计宗旨

**舒适开发，高效生产**

## 特性

- **🎨 拖拽式编辑器**: 直观的可视化编辑器，无需编写代码即可构建 H5 页面
- **📱 移动端优先**: 专为移动设备优化，支持响应式布局
- **🔧 组件系统**: 可扩展的组件库，内置常用组件
- **👀 实时预览**: 编辑过程中实时预览页面效果
- **📦 组件打包**: 支持在线组件构建和打包
- **🎯 TypeScript**: 提供类型安全的开发体验
- **⚡ 现代化技术栈**: 基于 Vue 3、Vite 等最新前端技术构建
- **🏗️ Monorepo 架构**: 使用 pnpm workspace 组织的 monorepo 结构
- **🔄 完整工作流**: 从编辑到预览到发布的完整流程

## 技术栈

- **包管理**: pnpm workspace
- **构建工具**: Turbo
- **前端**: Vue 3 + Element Plus + Vue Router + Pinia + Vite
- **后端**: Node.js + Koa + TypeScript + MongoDB
- **代码质量**: ESLint + Prettier + TypeScript

## 项目结构

```
mobile-maker/
├── apps/
│   ├── server/
│   │   ├── data-server/           # 主后端服务 (TypeScript + Koa)
│   │   └── build-server/          # 构建服务 (Node.js + Koa)
│   └── web/
│       ├── admin/                 # 管理界面 (Vue 3)
│       ├── editor/                # 页面编辑器 (Vue 3)
│       └── generator/             # 页面生成器/预览 (Vue 3)
├── packages/                      # 共享包
│   ├── api/                       # API 工具
│   ├── components/                # 组件库
│   ├── editor-core/               # 编辑器核心
│   ├── editor-helper/             # 编辑器辅助工具
│   ├── stores/                    # 状态管理
│   └── utils/                     # 工具函数
├── scripts/                       # 构建脚本
│   └── mk/                        # 自定义 CLI 工具
├── pnpm-workspace.yaml          # pnpm workspace 配置
├── package.json                  # 根 package.json
├── turbo.json                    # Turbo 配置
└── tsconfig.json                 # TypeScript 配置
```

## 安装和使用

### 环境要求

- Node.js >= 22
- pnpm >= 8.0
- MongoDB (后端服务需要)

### 安装

1. 获取项目代码

```bash
git clone https://github.com/iamwhj/mobile-maker.git
cd mobile-maker
```

2. 安装依赖

```bash
# 全局安装 pnpm (如果未安装)
npm i -g corepack

# 启用 corepack
corepack enable

# 安装所有依赖
pnpm install
```

### 开发

```bash
# 启动所有服务 (admin + data-server)
pnpm dev

# 启动特定服务
pnpm dev:editor      # 仅启动编辑器
pnpm dev:generator   # 仅启动生成器

# 启动单个服务
pnpm --filter @mk/admin dev
pnpm --filter @mk/data-server dev
pnpm --filter @mk/editor dev
pnpm --filter @mk/generator dev

# 更多脚本请看package.json
```

### 构建

```bash
# 打包构建开发环境
pnpm build
# 打包构建生产环境
pnpm build:prod

# 构建特定项目
pnpm build:server     # 构建后端服务
pnpm build:admin      # 构建管理界面
pnpm build:editor     # 构建编辑器
pnpm build:components # 构建组件库
pnpm build:generator  # 构建生成器
```

## 项目说明

### Admin (管理界面)

- **端口**: 8080 (默认)
- **技术栈**: Vue 3 + Element Plus + Vue Router + Pinia
- **功能**: 活动管理、组件管理、页面编辑

### Editor (页面编辑器)

- **技术栈**: Vue 3 + Element Plus
- **功能**: 拖拽式页面搭建、组件配置、实时预览

### Generator (页面生成器/预览)

- **技术栈**: Vue 3 + Element Plus
- **功能**: 生成可交互的 H5 页面、移动端适配、静态资源服务

### Data Server (后端服务)

- **端口**: 3000 (默认)
- **技术栈**: Node.js + Koa + TypeScript + MongoDB
- **功能**: API 服务、数据管理、页面生成

### Build Server (构建服务)

- **技术栈**: Node.js + Koa
- **功能**: 组件构建、静态资源生成

## 配置说明

### Catalog 依赖管理

项目使用 pnpm catalog 功能统一管理依赖版本，所有公共依赖都在 `pnpm-workspace.yaml` 的 `catalog` 部分定义。

### 配置文件

- 根目录的配置文件适用于所有子项目
- 子项目可以有自己的配置文件覆盖根目录配置
- TypeScript 配置支持继承和路径映射

## 浏览器支持

建议使用 `Chrome 80+` 浏览器进行本地开发

支持现代浏览器，不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                            last 2 versions                                                                                            |                                                                                                  last 2 versions                                                                                                  |                                                                                                last 2 versions                                                                                                |                                                                                                last 2 versions                                                                                                |

## 如何贡献

非常欢迎你的加入！[提交 Issue](https://github.com/iamwhj/mobile-maker/issues/new/choose) 或提交 Pull Request。

**Pull Request 流程:**

1. Fork 代码
2. 创建你的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送你的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## Git 贡献提交规范

参考 [Vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关，不影响运行结果
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `ci` 持续集成
- `types` TypeScript 类型定义文件改动

## 许可证

[MIT © 2024](./LICENSE)

## 作者

[@iamwhj](https://github.com/iamwhj)
