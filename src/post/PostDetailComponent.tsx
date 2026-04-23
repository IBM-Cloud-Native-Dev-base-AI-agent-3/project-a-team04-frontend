import { useTranslation } from 'react-i18next';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { APP_THEME } from '@/constants/theme';

interface PostDetail {
  id: number;
  title: string;
  userId?: number;
  body?: string;
  content?: string;
}

interface PostDetailComponentProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
  post: PostDetail | null;
  onBack: () => void;
}

export default function PostDetailComponent({ isLoggedIn, onLogout, post, onBack }: PostDetailComponentProps) {
  const { t } = useTranslation();

  if (!post) {
    return (
      <div className={APP_THEME.classes.pageShellMuted}>
        <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <main className="container mx-auto px-4 pt-44 pb-20">
          <div className="max-w-4xl mx-auto">
            <BackButton onClick={onBack} />
            <Card className="border border-slate-200 shadow-sm mb-8">
              <CardContent className="p-8">
                <p className="text-slate-700">게시글을 찾을 수 없습니다.</p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-4xl mx-auto">
          <BackButton onClick={onBack} />

          <Card className="border border-slate-200 shadow-sm mb-8">
            <CardContent className="p-8">
              <h1 className="text-xl font-black mb-4">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-slate-200">
                <span className="text-sm text-slate-600 font-medium">
                  {t('freeBoard.author')}: <span className="font-bold text-slate-800">user-{post.userId ?? 'unknown'}</span>
                </span>
                <span className="text-sm text-slate-600 font-medium">
                  {t('freeBoard.date')}: <span className="font-bold text-slate-800">-</span>
                </span>
                <span className="text-sm text-slate-600 font-medium">
                  {t('freeBoard.views')}: <span className="font-bold text-slate-800">0</span>
                </span>
              </div>

              <div className="py-8 mb-8 border-b border-slate-200">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{post.content ?? post.body ?? ''}</p>
              </div>

              <div className="flex gap-3 mb-8">
                <Button variant="outline" className="h-11 px-6 font-bold">
                  {t('common.edit')}
                </Button>
                <Button variant="outline" className="h-11 px-6 font-bold text-red-600 border-red-200">
                  {t('common.delete')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
