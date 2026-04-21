import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const WIS_BLUE = '#0054A6';

interface FreeBoardCreatePageProps {
  isLoggedIn: boolean;
}

export default function FreeBoardCreatePage({ isLoggedIn }: FreeBoardCreatePageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-black text-slate-900 mb-2">글쓰기</h1>
          <p className="text-slate-500 mb-8">자유게시판에 새로운 글을 작성해주세요.</p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">제목 *</label>
                  <Input placeholder="글의 제목을 입력해 주세요." />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">내용 *</label>
                  <textarea 
                    className="w-full h-64 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="글의 내용을 입력해 주세요."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1 h-11 text-white font-bold" 
                    style={{ backgroundColor: WIS_BLUE }}
                    onClick={() => navigate('/free-board')}
                  >
                    작성하기
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 h-11 font-bold"
                    onClick={() => navigate('/free-board')}
                  >
                    취소
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
