import { HackerNewsItem } from '@/types';

/**
 * 获取Hacker News热门文章ID列表
 */
export async function fetchTopStories(): Promise<number[]> {
  const apiUrl = process.env.HACKER_NEWS_API_URL || 'https://hacker-news.firebaseio.com/v0';
  const response = await fetch(`${apiUrl}/topstories.json`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch top stories: ${response.status}`);
  }
  
  return response.json();
}

/**
 * 获取单个Hacker News文章详情
 */
export async function fetchItem(id: number): Promise<HackerNewsItem> {
  const apiUrl = process.env.HACKER_NEWS_API_URL || 'https://hacker-news.firebaseio.com/v0';
  const response = await fetch(`${apiUrl}/item/${id}.json`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch item ${id}: ${response.status}`);
  }
  
  return response.json();
}

/**
 * 翻译文本（使用免费翻译API）
 * 添加了重试机制和请求限制处理
 */
export async function translateText(text: string, targetLang: string = 'zh'): Promise<string> {
  // 使用免费的翻译API - 无需API密钥
  const apiUrl = 'https://api.mymemory.translated.net/get';
  
  // 最大重试次数
  const maxRetries = 2;
  let retries = 0;
  
  while (retries <= maxRetries) {
    try {
      // 构建URL参数
      const params = new URLSearchParams({
        q: text,
        langpair: `en|${targetLang}`,
      });
      
      const response = await fetch(`${apiUrl}?${params.toString()}`);
      
      // 处理429错误（请求过多）
      if (response.status === 429) {
        retries++;
        if (retries <= maxRetries) {
          // 指数退避策略，等待时间随重试次数增加
          const waitTime = Math.pow(2, retries) * 1000;
          console.log(`请求过多(429)，等待${waitTime}ms后重试...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        console.error('达到最大重试次数，返回原文');
        return `[API限流] ${text}`;
      }
      
      if (!response.ok) {
        throw new Error(`Translation failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      // MyMemory API返回格式不同，需要从responseData中提取翻译文本
      if (data && data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      } else {
        throw new Error('Invalid translation response format');
      }
    } catch (error) {
      console.error('Translation error:', error);
      retries++;
      
      if (retries <= maxRetries) {
        const waitTime = Math.pow(2, retries) * 1000;
        console.log(`翻译出错，等待${waitTime}ms后重试...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        return `[翻译失败] ${text}`; // 翻译失败时返回带标记的原文
      }
    }
  }
  
  return `[未知错误] ${text}`;
}

/**
 * 获取并处理前30条热门新闻
 */
export async function fetchTopNews(limit: number = 30): Promise<HackerNewsItem[]> {
  try {
    // 获取热门文章ID
    const topStoryIds = await fetchTopStories();
    const limitedIds = topStoryIds.slice(0, limit);
    
    // 并行获取文章详情
    const itemPromises = limitedIds.map(id => fetchItem(id));
    const items = await Promise.all(itemPromises);
    
    // 过滤掉没有URL或标题的文章
    const validItems = items.filter(item => item.url && item.title);
    
    // 并行翻译标题
    const translationPromises = validItems.map(async (item) => {
      const translatedTitle = await translateText(item.title);
      return {
        ...item,
        translatedTitle,
      };
    });
    
    return Promise.all(translationPromises);
  } catch (error) {
    console.error('Error fetching top news:', error);
    return [];
  }
}