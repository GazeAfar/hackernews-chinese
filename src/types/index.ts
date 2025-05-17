// 定义Hacker News文章类型
export interface HackerNewsItem {
  id: number;
  title: string;
  url: string;
  score: number;
  time: number;
  by: string;
  translatedTitle?: string;
}

// 翻译API请求类型
export interface TranslateRequest {
  q: string;
  source: string;
  target: string;
  format?: string;
  api_key?: string;
}

// 翻译API响应类型
export interface TranslateResponse {
  translatedText: string;
}