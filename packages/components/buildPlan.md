### 方案一 全量打包 + 按需打包

简介：一套全量打包配置，一套按需打包配置，通过环境变量控制使用

优点：可以输入组件库的umd格式

缺点：组件代码重复打包，全量打进去了一套组件代码，按需又打出了一套组件代码

```js
// vite.config.js
// 根据构建模式决定配置
const buildMode = process.env.BUILD_MODE || 'full'
let config
if (buildMode === 'full') {
  // 全量构建配置
  config = defineConfig({
    plugins: [vue(), visualizer()],
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'index.js'),
        name: 'MKComponents',
        formats: ['es', 'umd'],
        fileName: (format) => (format === 'es' ? 'index.esm.js' : 'index.js'),
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: { vue: 'Vue' },
        },
      },
      outDir: 'dist',
      emptyOutDir: true,
    },
  })
} else {
  // 按需构建配置 (这个多入口打包实现按需打包的方式不好，1没办法精确分包，每个组件的依赖自己的文件夹里 2公共依赖会单独打，组件代码依赖外部依赖，后期没法做版本更新和管理)
  config = defineConfig({
    plugins: [vue()],
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
    },
    build: {
      rollupOptions: {
        input: {
          ...componentDiscovery.generateComponentEntries(),
        },
        external: ['vue'],
        output: {
          entryFileNames: (chunkInfo) => `components/${chunkInfo.name}/index.esm.js`,
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          format: 'es',
          globals: { vue: 'Vue' },
        },
      },
      outDir: 'dist/components',
      emptyOutDir: true,
    },
  })
}

export default config
```

```js
// 打包脚本
script: {
  "build": "npm run build:full && npm run build:on-demand",
  "build:full": "cross-env BUILD_MODE=full vite build",
  "build:on-demand": "cross-env BUILD_MODE=on-demand vite build",
}
```

### 方案二 按需打包 + 外层全量入口 index.js

简介：一套配置，通过库模式打包全量入口，然后manualChunks分出组件代码

优点：只需要打包出一套组件代码

缺点：仅能输出组件库的es格式，不支持输入umd格式

体验：这个方案看似最优，但是无法满足组件按需引入，通过<script src>引入的方式

```js
// vite.config.js
import ComponentDiscovery from '../../scripts/component-discovery.js'

const componentDiscovery = new ComponentDiscovery()
const componentEntries = componentDiscovery.generateComponentEntries()

export default defineConfig({
  plugins: [vue(), visualizer()],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'MKComponents',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        manualChunks: (id) => {
          if (id.includes('src/components/')) {
            const componentName = basename(dirname(id))
            if (Object.keys(componentEntries).includes(componentName)) {
              return `components/${componentName}`
            }
          }
          if (id.includes('components/shared') || id.includes('components/plugins')) {
            return 'common'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        chunkFileNames: (chunkInfo) => {
          const componentName = chunkInfo.name.split('/')[1]
          if (Object.keys(componentEntries).includes(componentName)) {
            return `components/${componentName}/index.js`
          }
          return `[name]-[hash].js`
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
```

### 考量

编辑和预览应用采用全量引入组件库，admin里引入了editor实现编辑功能，引入generator实现预览功能，打包admin时就一并全量打包了editor、generator、components。发布功能需要根据应用appData按需引入组件，故而单独打包components只是为发布功能服务的，不需要考虑全量引入，只需要打包出按需引入即可

### 选择

好了，以上方案都被我毙掉了，vite.lib多入口打包无法满足每个组件独立打包并把产物归类到各个组件文件的需求，1、assets资源无法获取到是从哪些组件出来的，进而无法放到对应的组件文件夹里，2、公共代码会自动抽出成一份，组件都会引用公共代码，后续不方便对单独的组件做版本管理和更新。最终单独写一份打包脚本，一个一个组件的打包，然后开发一个 mk 组件命令行脚手架工具，统一管理组件的开发模板代码创建，入口索引生成，组件打包等功能
