<div align="center">
  <a href="https://github.com/iamwhj/mobile-maker">
    <img alt="Mobile Maker Logo" width="215" src="apps/web/admin/public/lowcode.png">
  </a>
  <br>
  <br>

[![license](https://img.shields.io/github/license/iamwhj/mobile-maker.svg)](LICENSE)

  <h1>Mobile Maker</h1>
  <h3>A Low-Code Platform for Building Interactive H5 Pages</h3>
</div>

[![license](https://img.shields.io/github/license/iamwhj/mobile-maker.svg)](LICENSE) [![vue](https://img.shields.io/github/languages/top/iamwhj/mobile-maker.svg)](https://github.com/iamwhj/mobile-maker) [![pnpm](https://img.shields.io/badge/pnpm-8.0+-orange.svg)](https://pnpm.io/)

**English** | [中文](./README.zh-CN.md)

## Introduction

Mobile Maker is a free and open-source low-code platform that enables rapid creation of interactive H5 pages through drag-and-drop functionality. The project focuses on exploring core features of low-code platforms, providing a complete production workflow (editing-preview-publishing) with online component packaging capabilities. It's an excellent learning resource for understanding low-code platform architecture.

## Design Philosophy

**Comfortable Development, Efficient Production**

## Features

- **🎨 Drag-and-Drop Editor**: Intuitive visual editor for building H5 pages without coding
- **📱 Mobile-First Design**: Optimized for mobile devices with responsive layouts
- **🔧 Component System**: Extensible component library with built-in common components
- **👀 Live Preview**: Real-time preview of pages during editing
- **📦 Component Packaging**: Online component building and packaging
- **🎯 TypeScript**: Type-safe development experience
- **⚡ Modern Tech Stack**: Built with Vue 3, Vite, and latest frontend technologies
- **🏗️ Monorepo Architecture**: Well-organized monorepo structure using pnpm workspace
- **🔄 Complete Workflow**: Full pipeline from editing to preview to publishing

## Technology Stack

- **Package Management**: pnpm workspace
- **Build Tool**: Turbo
- **Frontend**: Vue 3 + Element Plus + Vue Router + Pinia + Vite
- **Backend**: Node.js + Koa + TypeScript + MongoDB
- **Code Quality**: ESLint + Prettier + TypeScript

## Project Structure

```
mobile-maker/
├── apps/
│   ├── server/
│   │   ├── data-server/           # Main backend service (TypeScript + Koa)
│   │   └── build-server/          # Build service (Node.js + Koa)
│   └── web/
│       ├── admin/                 # Admin management interface (Vue 3)
│       ├── editor/                # Page editor (Vue 3)
│       └── generator/             # Page generator/preview (Vue 3)
├── packages/                      # Shared packages
│   ├── api/                       # API utilities
│   ├── components/                # Component library
│   ├── editor-core/               # Editor core
│   ├── editor-helper/             # Editor helpers
│   ├── stores/                    # State management
│   └── utils/                     # Utility functions
├── scripts/                       # Build scripts
│   └── mk/                        # Custom CLI tool
├── pnpm-workspace.yaml          # pnpm workspace config
├── package.json                  # Root package.json
├── turbo.json                    # Turbo config
└── tsconfig.json                 # TypeScript config
```

## Install and Use

### Prerequisites

- Node.js >= 22
- pnpm >= 8.0
- MongoDB (for backend services)

### Installation

1. Get the project code

```bash
git clone https://github.com/iamwhj/mobile-maker.git
cd mobile-maker
```

2. Install dependencies

```bash
# Install pnpm globally (if not installed)
npm i -g corepack

# Enable corepack
corepack enable

# Install all dependencies
pnpm install
```

### Development

```bash
# Start all services (admin + data-server)
pnpm dev

# Start specific services
pnpm dev:editor      # Start editor only
pnpm dev:generator   # Start generator only

# For more scripts look at the package.json
```

### Build

```bash
# Build all projects for development
pnpm build
# Build all projects for prodution
pnpm build:prod

# Build specific projects
pnpm build:server     # Build backend services
pnpm build:admin      # Build admin interface
pnpm build:editor     # Build editor
pnpm build:components # Build component library
pnpm build:generator  # Build generator
```

## Project Components

### Admin (Management Interface)

- **Port**: 8080 (default)
- **Tech Stack**: Vue 3 + Element Plus + Vue Router + Pinia
- **Features**: Activity management, component management, page editing

### Editor (Page Editor)

- **Tech Stack**: Vue 3 + Element Plus
- **Features**: Drag-and-drop page building, component configuration, live preview

### Generator (Page Generator/Preview)

- **Tech Stack**: Vue 3 + Element Plus
- **Features**: Generate interactive H5 pages, mobile adaptation, static resource serving

### Data Server (Backend Service)

- **Port**: 3000 (default)
- **Tech Stack**: Node.js + Koa + TypeScript + MongoDB
- **Features**: API services, data management, page generation

### Build Server (Build Service)

- **Tech Stack**: Node.js + Koa
- **Features**: Component building, static resource generation

## Configuration

### Catalog Dependency Management

The project uses pnpm catalog feature to centrally manage dependency versions. All common dependencies are defined in the `catalog` section of `pnpm-workspace.yaml`.

### Configuration Files

- Root-level configuration files apply to all sub-projects
- Sub-projects can have their own configuration files to override root settings
- TypeScript configuration supports inheritance and path mapping

## Browser Support

The `Chrome 80+` browser is recommended for local development

Supports modern browsers, not IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                            last 2 versions                                                                                            |                                                                                                  last 2 versions                                                                                                  |                                                                                                last 2 versions                                                                                                |                                                                                                last 2 versions                                                                                                |

## How to Contribute

You are very welcome to join! [Raise an issue](https://github.com/iamwhj/mobile-maker/issues/new/choose) or submit a Pull Request.

**Pull Request Process:**

1. Fork the code
2. Create your branch: `git checkout -b feat/xxxx`
3. Submit your changes: `git commit -am 'feat(function): add xxxxx'`
4. Push your branch: `git push origin feat/xxxx`
5. Submit `pull request`

## Git Contribution Submission Specification

Reference [Vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) specification ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `feat` Add new features
- `fix` Fix the problem/BUG
- `style` The code style is related and does not affect the running result
- `perf` Optimization/performance improvement
- `refactor` Refactor
- `revert` Undo edit
- `test` Test related
- `docs` Documentation/notes
- `chore` Dependency update/scaffolding configuration modification etc.
- `ci` Continuous integration
- `types` Type definition file changes

## License

[MIT © 2024](./LICENSE)

## Author

[@iamwhj](https://github.com/iamwhj)
