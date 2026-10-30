import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 部署目标：GitHub Pages 项目站 https://yuxinrun.github.io/better-agent/
// 站点位于 /better-agent/ 子路径，dev / preview / build 保持一致。
export default defineConfig({
  base: '/better-agent/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
