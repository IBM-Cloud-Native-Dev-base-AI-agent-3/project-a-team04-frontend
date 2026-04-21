import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FREE_POSTS } from '@/data/freePosts';

interface FreeBoardDetailPageProps {
  isLoggedIn: boolean;
}

export default function FreeBoardDetailPage({ isLoggedIn }: FreeBoardDetailPageProps) {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const id = parseInt(pathname.split('/')[2]);
  const post = FREE_POSTS.find(p => p.id === id) || FREE_POSTS[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-4xl mx-auto">
          <BackButton onClick={() => navigate('/free-board')} />

          <Card className="border border-slate-200 shadow-sm mb-8">
            <CardContent className="p-8">
              <h1 className="text-3xl font-black mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-slate-200">
                <span className="text-sm text-slate-600 font-medium">작성자: <span className="font-bold text-slate-800">{post.author}</span></span>
                <span className="text-sm text-slate-600 font-medium">작성일: <span className="font-bold text-slate-800">{post.date}</span></span>
                <span className="text-sm text-slate-600 font-medium">조회수: <span className="font-bold text-slate-800">{post.views}</span></span>
              </div>

              <div className="py-8 mb-8 border-b border-slate-200">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>

              <div className="flex gap-3 mb-8">
                <Button variant="outline" className="h-11 px-6 font-bold">
                  수정
                </Button>
                <Button variant="outline" className="h-11 px-6 font-bold text-red-600 border-red-200">
                  삭제
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
