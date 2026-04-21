import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

interface FreeBoardCreatePageProps {
  isLoggedIn: boolean;
}

export default function FreeBoardCreatePage({ isLoggedIn }: FreeBoardCreatePageProps) {
  const navigate = useNavigate();

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-4xl mx-auto">
          <BackButton onClick={() => navigate('/free-board')} />

          <h1 className="text-3xl font-black text-slate-900 mb-2">글쓰기</h1>
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
                    className="w-full h-64 px-3 py-2 border border-input bg-transparent rounded text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                    placeholder="글의 내용을 입력해 주세요."
                  />
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full h-11 text-white font-bold"
                    style={APP_STYLES.primaryButton}
                    onClick={() => navigate('/free-board')}
                  >
                    작성하기
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
