import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FREE_POSTS } from '@/data/freePosts';

const WIS_BLUE = '#0054A6';

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
              <h1 className="text-4xl font-black mb-4">{post.title}</h1>
              
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
                <Button className="h-11 px-6 text-white font-bold" style={{ backgroundColor: WIS_BLUE }}>
                  좋아요
                </Button>
                <Button variant="outline" className="h-11 px-6 font-bold">
                  수정
                </Button>
                <Button variant="outline" className="h-11 px-6 font-bold text-red-600 border-red-200">
                  삭제
                </Button>
              </div>

              <Separator className="my-8" />

              <div>
                <h2 className="text-2xl font-black mb-6">댓글 ({1})</h2>
                
                <div className="mb-8 p-4 bg-white border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-slate-800">itlover</p>
                      <p className="text-sm text-slate-500">2026.04.15 14:30</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs text-slate-500 hover:text-blue-600 font-medium">수정</button>
                      <button className="text-xs text-slate-500 hover:text-red-600 font-medium">삭제</button>
                    </div>
                  </div>
                  <p className="text-slate-700">좋은 글 감사합니다!</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <label className="block text-sm font-bold text-slate-700 mb-3">댓글 작성</label>
                  <textarea 
                    className="w-full h-20 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                    placeholder="댓글을 입력해 주세요."
                  />
                  <Button className="w-full h-10 text-white font-bold" style={{ backgroundColor: WIS_BLUE }}>
                    댓글 작성
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
