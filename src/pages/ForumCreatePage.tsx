import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

const forumThemes = ['AI', '스타트업', '클라우드', '보안', '데이터', '네트워킹', 'DX', '로보틱스', '스마트팩토리', '핀테크'];
const forumPlaces = ['COEX Hall A', 'COEX Hall B', 'COEX Hall C', 'COEX Conference Room'];

interface ForumCreatePageProps {
  isLoggedIn: boolean;
}

export default function ForumCreatePage({ isLoggedIn }: ForumCreatePageProps) {
  const navigate = useNavigate();

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-black text-slate-900 mb-2">포럼 등록</h1>
          <p className="text-slate-500 mb-8">새로운 포럼을 등록해주세요.</p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">포럼 제목 *</label>
                  <Input placeholder="포럼 제목을 입력해 주세요." />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">주제 *</label>
                    <select className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>주제를 선택해 주세요.</option>
                      {forumThemes.map((theme) => (
                        <option key={theme} value={theme}>{theme}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">일시 *</label>
                    <Input type="datetime-local" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">장소 *</label>
                  <select className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>장소를 선택해 주세요.</option>
                    {forumPlaces.map((place) => (
                      <option key={place} value={place}>{place}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">설명 *</label>
                  <textarea 
                    className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="포럼에 대한 설명을 입력해 주세요."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">포럼 대표 이미지</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                    <p className="text-slate-600 font-medium">이미지를 드래그하거나 클릭하여 선택</p>
                    <p className="text-sm text-slate-500 mt-1">최대 5MB까지 가능합니다.</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1 h-11 text-white font-bold" 
                    style={APP_STYLES.primaryButton}
                    onClick={() => navigate('/forum-guide')}
                  >
                    등록하기
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 h-11 font-bold"
                    onClick={() => navigate('/forum-guide')}
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
