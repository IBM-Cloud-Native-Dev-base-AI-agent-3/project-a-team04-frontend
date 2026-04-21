import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const WIS_BLUE = '#0054A6';
const WIS_ORANGE = '#F68B1E';

interface ProfilePageProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function ProfilePage({ isLoggedIn, onLogout }: ProfilePageProps) {
  const navigate = useNavigate();

  const handleWithdraw = () => {
    if (window.confirm('정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 프로필 정보 */}
          <div className="lg:col-span-1">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                    JC
                  </div>
                  <h2 className="text-2xl font-black mb-1">김종찬</h2>
                  <p className="text-slate-500 text-sm mb-6">jc.kim@company.com</p>
                  <Separator className="my-4" />
                  <div className="w-full space-y-3 text-sm">
                    <div className="text-left">
                      <p className="text-slate-500 font-medium mb-1">가입일</p>
                      <p className="text-slate-800 font-semibold">2026.04.01</p>
                    </div>
                    <div className="text-left">
                      <p className="text-slate-500 font-medium mb-1">회원등급</p>
                      <p className="text-slate-800 font-semibold">일반회원</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 프로필 수정 */}
          <div className="lg:col-span-2">
            <Card className="border border-slate-200 shadow-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-black mb-6">프로필 정보 수정</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">이름</label>
                    <Input placeholder="김종찬" defaultValue="김종찬" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">이메일</label>
                    <Input placeholder="이메일" type="email" defaultValue="jc.kim@company.com" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">소속사</label>
                    <Input placeholder="소속사" defaultValue="IBM" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">직급</label>
                    <Input placeholder="직급" defaultValue="Senior Developer" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">자기소개</label>
                    <textarea 
                      className="w-full h-24 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="자기소개를 입력해 주세요."
                      defaultValue="IT 기술에 관심이 많은 개발자입니다."
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1 h-11 text-white font-bold" style={{ backgroundColor: WIS_BLUE }}>
                      저장
                    </Button>
                    <Button variant="outline" className="flex-1 h-11 font-bold">
                      취소
                    </Button>
                  </div>
                </div>

                <Separator className="my-8" />

                <div>
                  <h3 className="text-lg font-black mb-4 text-slate-900">비밀번호 변경</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">현재 비밀번호</label>
                      <Input placeholder="현재 비밀번호" type="password" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">새로운 비밀번호</label>
                      <Input placeholder="새로운 비밀번호" type="password" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">새로운 비밀번호 확인</label>
                      <Input placeholder="새로운 비밀번호 확인" type="password" />
                    </div>
                    <Button className="w-full h-11 text-white font-bold" style={{ backgroundColor: WIS_ORANGE }}>
                      변경
                    </Button>
                  </div>
                </div>

                <Separator className="my-8" />

                <div>
                  <h3 className="text-lg font-black mb-4 text-red-600">회원 탈퇴</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    회원 탈퇴 시 모든 개인 정보와 작성한 게시물이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                  </p>
                  <Button 
                    className="w-full h-11 text-white font-bold" 
                    style={{ backgroundColor: '#ef4444' }}
                    onClick={handleWithdraw}
                  >
                    회원 탈퇴
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
