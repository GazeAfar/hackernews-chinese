import { HackerNewsItem } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface NewsTableProps {
  newsItems: HackerNewsItem[];
}

export default function NewsTable({ newsItems }: NewsTableProps) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs uppercase" style={{ backgroundColor: 'var(--card-bg)' }}>
          <tr>
            <th scope="col" className="px-3 py-3 sm:px-6">#</th>
            <th scope="col" className="px-3 py-3 sm:px-6">标题</th>
            <th scope="col" className="px-3 py-3 sm:px-6 hidden md:table-cell">分数</th>
            <th scope="col" className="px-3 py-3 sm:px-6 hidden sm:table-cell">发布时间</th>
          </tr>
        </thead>
        <tbody>
          {newsItems.length > 0 ? (
            newsItems.map((item, index) => {
              const timestamp = new Date(item.time * 1000);
              const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true, locale: zhCN });
              
              return (
                <tr 
                  key={item.id} 
                  className="border-b hover:bg-opacity-50"
                  style={{ 
                    borderColor: 'var(--border-color)',
                    backgroundColor: index % 2 === 0 ? 'var(--background)' : 'var(--card-bg)',
                  }}
                >
                  <td className="px-3 py-3 sm:px-6 sm:py-4">{index + 1}</td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4">
                    <div className="flex flex-col">
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'var(--link-color)' }}
                        className="font-medium hover:underline mb-1"
                      >
                        {item.translatedTitle?.startsWith('[') ? item.translatedTitle : (item.translatedTitle || '加载中...')}
                      </a>
                      <span className="text-xs opacity-70">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 hidden md:table-cell">{item.score}</td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 hidden sm:table-cell">{timeAgo}</td>
                </tr>
              );
            })
          ) : (
            <tr style={{ borderColor: 'var(--border-color)' }} className="border-b">
              <td colSpan={4} className="px-3 py-3 sm:px-6 sm:py-4 text-center">
                加载中...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}