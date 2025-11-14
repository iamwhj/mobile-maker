import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [vue(), visualizer()],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
  },
})
