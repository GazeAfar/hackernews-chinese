'use server';

import { fetchTopNews } from '@/lib/api';
import { HackerNewsItem } from '@/types';

/**
 * 获取Hacker News热门新闻的Server Action
 * 这个函数可以在客户端组件中调用，但实际执行在服务端
 */
export async function getHackerNewsItems(): Promise<HackerNewsItem[]> {
  try {
    const newsItems = await fetchTopNews(30);
    return newsItems;
  } catch (error) {
    console.error('Failed to fetch news items:', error);
    return [];
  }
}