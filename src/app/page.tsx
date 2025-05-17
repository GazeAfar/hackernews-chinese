import { fetchTopNews } from '@/lib/api';
import NewsTable from '@/components/NewsTable';
import { HackerNewsItem } from '@/types';

export const revalidate = 3600; // 每小时重新验证一次数据

export default async function Home() {
  // 服务端获取新闻数据
  const newsItems: HackerNewsItem[] = await fetchTopNews(30);
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-12 lg:p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">Hacker News 中文聚合</h1>
        <p className="text-center mb-4 sm:mb-8 opacity-70">
          每日自动抓取 Hacker News 热门新闻，并翻译为中文
        </p>
        
        {/* 新闻列表组件 */}
        <NewsTable newsItems={newsItems} />
        
        <footer className="mt-8 sm:mt-12 text-center text-sm opacity-60">
          <p>数据来源: <a href="https://news.ycombinator.com/" style={{ color: 'var(--link-color)' }} className="hover:underline" target="_blank" rel="noopener noreferrer">Hacker News</a></p>
          <p className="mt-2">使用 Next.js 构建 | 部署于 Vercel</p>
        </footer>
      </div>
    </main>
  );
}
