import { useTranslation } from 'react-i18next';

interface PostTableComponentProps {
  posts: Array<{
    id: number;
    title: string;
    author: string;
    date: string;
    views: number;
  }>;
  onRowClick: (id: number) => void;
}

export default function PostTableComponent({ posts, onRowClick }: PostTableComponentProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left font-bold">{t('freeBoard.title')}</th>
              <th className="px-4 py-3 text-left font-bold w-32">{t('freeBoard.author')}</th>
              <th className="px-4 py-3 text-left font-bold w-24">{t('freeBoard.views')}</th>
              <th className="px-4 py-3 text-left font-bold w-32">{t('freeBoard.date')}</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-t border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => onRowClick(post.id)}
              >
                <td className="px-4 py-3 font-medium text-slate-800 hover:text-blue-600">{post.title}</td>
                <td className="px-4 py-3 text-slate-600">{post.author}</td>
                <td className="px-4 py-3 text-slate-600">{post.views}</td>
                <td className="px-4 py-3 text-slate-600">{post.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
