# Hacker News 中文聚合

这是一个使用 Next.js 构建的 Hacker News 中文聚合网站，自动抓取 Hacker News 热门新闻并翻译为中文。

## 功能特点

- 自动获取 Hacker News 热门文章
- 使用翻译 API 将标题翻译为中文
- 响应式设计，适配移动端和桌面端
- 服务端渲染，提供良好的 SEO 和性能
- 每小时自动更新数据

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- LibreTranslate API (翻译服务)
- Hacker News API

## 本地开发

### 前置条件

- Node.js 18.0.0 或更高版本
- npm 或 yarn

### 安装步骤

1. 克隆仓库

```bash
git clone <仓库地址>
cd hackernews
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

复制 `.env.local` 文件并根据需要修改：

```bash
cp .env.local.example .env.local
```

> 注意：如需使用翻译功能，请在 `.env.local` 中填入有效的 LibreTranslate API 密钥。如果不填写，应用将显示未翻译的原始标题。

4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

## 部署

### 部署到 Vercel

1. 在 Vercel 上导入 GitHub 仓库
2. 配置环境变量 (在 Vercel 项目设置中)
3. 部署

## 许可证

MIT
