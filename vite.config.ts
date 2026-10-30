import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 部署目标：GitHub Pages 用户站 https://yuxinks.github.io/
// 站点位于域名根路径，因此 base 固定为 '/'。
// 若以后改部署到项目页（https://<user>.github.io/<repo>/），
// 把 base 改成 '/<repo>/'，并把路由保持为 HashRouter。
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
