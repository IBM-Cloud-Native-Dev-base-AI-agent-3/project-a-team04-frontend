import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FORUMS } from '@/data/forums';

const WIS_BLUE = '#0054A6';

interface ForumDetailPageProps {
  isLoggedIn: boolean;
}

export default function ForumDetailPage({ isLoggedIn }: ForumDetailPageProps) {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const id = pathname.split('/')[2];
  const forum = FORUMS.find(f => f.id === id) || FORUMS[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-4xl mx-auto">
          <BackButton onClick={() => navigate('/forum-guide')} />

          <Card className="border border-slate-200 shadow-sm mb-8">
            <CardContent className="p-8">
              <div className="mb-6">
                <img 
                  src={forum.thumbnail}
                  alt="포럼 이미지"
                  className="w-full h-96 object-cover rounded-lg mb-6"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h1 className="text-4xl font-black mb-2">{forum.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-slate-200">
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">{forum.title.split(' ')[0]}</Badge>
                <span className="text-sm text-slate-500 font-medium">등록일: {forum.date}</span>
                <span className="text-sm text-slate-500 font-medium">작성자: admin</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-200">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">일시</p>
                  <p className="font-semibold text-slate-800">{forum.date} | 13:00 ~ 15:00</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">장소</p>
                  <p className="font-semibold text-slate-800">{forum.place}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">포럼 소개</h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {forum.content}
                </p>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 h-11 text-white font-bold" style={{ backgroundColor: WIS_BLUE }}>
                  포럼 등록
                </Button>
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
