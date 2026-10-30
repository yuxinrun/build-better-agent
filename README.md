# 如何构建更好的 Agent · 鱼心快跑

写给传统程序员转型 Agent 开发、以及 Agent 工程师进阶的实战手册。中英双语、明暗主题、桌面与移动端自适应。

站点入口：`/#/`（HashRouter，静态托管无需额外 rewrite 配置）

## 本地开发

```bash
npm install
npm run dev
```

## 构建与预览

```bash
npm run build     # tsc -b + vite build，产物在 dist/
npm run preview   # 预览生产构建
npm run lint      # oxlint
```

把 `dist/` 整体部署到任意静态托管即可。

## 部署到 GitHub Pages

目标站点：<https://yuxinks.github.io/>（仓库 `yuxinks/yuxinks.github.io`，域名根路径）。

- `vite.config.ts` 的 `base` 为 `/`，与根路径部署对应。
- 路由使用 `HashRouter`，深链接形如 `/#/about`，GitHub Pages 刷新不会 404，无需 `404.html` 回退。
- `public/.nojekyll` 会随构建进入 `dist/`，避免 Jekyll 处理静态资源。

发布（只推送 `dist/` 内的文件，不含 `dist` 目录本身）：

```bash
npm run deploy
# = npm run build && gh-pages -d dist -b main \
#   -r https://github.com/yuxinks/yuxinks.github.io.git --no-history
```

说明：

1. 首次执行前确认本地有该仓库的推送权限（git 凭据或 `GH_TOKEN` 环境变量）。
2. 该命令会强制替换目标仓库 `main` 分支的根目录内容，即网站文件本身就是仓库根目录。
3. 在仓库 Settings → Pages 中选择 “Deploy from a branch” → `main` / `/ (root)`。
4. 若以后改为项目页部署（`https://<user>.github.io/<repo>/`），把 `base` 改为 `'/<repo>/'` 并保持 HashRouter。

## 目录结构

```
src/
  assets/           logo 原图（透明 PNG，构建时带 hash 输出）
  content/
    chapters/       10 章结构化双语内容（ch1.ts ~ ch10.ts）
    home.ts         首页路线、踩坑、资源、上线 12 关
    site.ts         作者信息、FAQ、更新日志
    glossary.ts     32 个 Agent 术语（4 组，中英对照）
    toolkit.ts      6 套可复制模板（提示、工具、评测、trace、审批、上线）
    types.ts        Chapter / Section / Block 类型
  components/
    diagrams/       Agent Loop、模式库与静态 SVG 图解
    labs/           上下文预算、成本估算、形态决策、工具体检
  pages/            首页、章节、实验室、工具箱、术语表、FAQ、关于、404
  i18n/             中英文切换（localStorage: yx-lang）
  theme/            明暗主题（localStorage: yx-theme）
  styles/           设计系统与页面样式（新增页面在 pages.css）
```

## 添加或修改章节

1. 在 `src/content/chapters/chN.ts` 中按 `Chapter` 类型编写双语内容。
2. 在 `src/content/chapters/index.ts` 的数组中加入该章节。
3. 支持的内容块：`p`、`list`、`cards`、`callout`、`code`、`diagram`、`table`、`steps`、`checklist`、`formula`。

## 设计说明

- 配色为暖纸浅色与深海深色两套 token，定义在 `src/styles/base.css`。
- 字体使用本地打包的 Manrope / JetBrains Mono（`@fontsource-variable`），无外部字体请求。
- 图解全部为手写 SVG/CSS，未引入图表库。
- 路由使用 HashRouter，便于在静态托管和子路径下直接访问。
- 品牌标志为透明背景 PNG（`src/assets/yuxin-run.png`），页头按比例缩放，不依赖底色。
- 浏览器页签图标由该 logo 生成（`scripts/make-icons.ps1`）：`/favicon.ico`（16/32/48）、`favicon-16/32.png`、`apple-touch-icon.png` 与 `icon-192/512.png`；更换 logo 后重跑脚本即可。

## 参考来源

- Anthropic, *Building effective agents*
- OpenAI, *A practical guide to building agents*
- LangChain / LangGraph 文档
- 12-Factor Agents
- 李博杰《深入理解 AI Agent》

内容为学习与工程实践整理，示例价格与数字均为示意，请以官方文档为准。
