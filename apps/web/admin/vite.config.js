import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

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
    visualizer(),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 将 admin 相关代码打包成独立文件
        manualChunks: (id) => {
          if (id.includes('element-plus')) {
            return 'element-plus'
          }
          if (id.includes('echarts')) {
            return 'echarts'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const assetName = assetInfo.name
          const imgExts = [
            '.png',
            '.jpg',
            '.jpeg',
            '.webp',
            '.svg',
            '.gif',
            '.ico',
          ]
          if (imgExts.some((ext) => assetName.endsWith(ext))) {
            return 'imgs/[name]-[hash].[ext]'
          }
          if (assetName.endsWith('.css')) {
            return 'css/[name]-[hash].css'
          }
          return 'assets/[name]-[hash].[ext]'
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '^/api': {
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        target: 'http://localhost:3000',
        ws: true,
      },
    },
  },
})
