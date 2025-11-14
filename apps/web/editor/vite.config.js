import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ComponentDiscovery from '../../../scripts/component-discovery.js'
import { visualizer } from 'rollup-plugin-visualizer'

const componentDiscovery = new ComponentDiscovery()

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'types/components.d.ts',
    }),
    visualizer()
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        globals: {
          vue: 'Vue',
          pinia: 'Pinia',
        },
        // Editor 全量引入 components，动态将每个组件打包成独立文件
        manualChunks: (id) => {
          // 动态组件分块
          const componentNames = componentDiscovery.getComponentNames()
          for (const name of componentNames) {
            if (id.includes(`@mk/components/src/${name}`)) {
              return `components/${name}`
            }
          }
          
          // Editor 核心功能
          if (id.includes('src/')) {
            return 'editor-core'
          }
          
          // Generator 相关代码
          if (id.includes('@mk/generator')) {
            return 'generator'
          }
        },
      },
      input: 'src/devExport.js',
    },
  },
  server: {
    proxy: {
      '/api': {
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        target: 'http://localhost:3000',
        ws: true,
      },
    },
  },
})
