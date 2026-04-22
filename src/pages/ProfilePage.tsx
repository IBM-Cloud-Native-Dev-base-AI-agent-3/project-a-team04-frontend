import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

interface ProfilePageProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function ProfilePage({ isLoggedIn, onLogout }: ProfilePageProps) {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const profileAvatarStyle = {
    background: `linear-gradient(135deg, ${APP_THEME.colors.logoBlue}, ${APP_THEME.colors.primary})`,
  };

  const handleWithdraw = () => {
    if (window.confirm('정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-3xl mx-auto">
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-black mb-6">프로필 정보</h2>
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4" style={profileAvatarStyle}>
                  JC
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">닉네임</label>
                  <Input className={APP_THEME.classes.formInput} placeholder="닉네임" defaultValue="JC" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">이메일</label>
                  <Input className={APP_THEME.classes.formInput} placeholder="이메일" type="email" defaultValue="jc.kim@company.com" disabled />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-2">역할</p>
                  <p className={APP_THEME.classes.bodyText}>일반회원</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">현재 비밀번호</label>
                  <div className="relative">
                    <Input
                      className={`${APP_THEME.classes.formInput} pr-12`}
                      placeholder="현재 비밀번호"
                      type={showCurrentPassword ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                      onClick={() => setShowCurrentPassword((visible: boolean) => !visible)}
                      aria-label={showCurrentPassword ? '현재 비밀번호 숨기기' : '현재 비밀번호 보기'}
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호 변경</label>
                  <div className="relative">
                    <Input
                      className={`${APP_THEME.classes.formInput} pr-12`}
                      placeholder="비밀번호 변경"
                      type={showNewPassword ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                      onClick={() => setShowNewPassword((visible: boolean) => !visible)}
                      aria-label={showNewPassword ? '새 비밀번호 숨기기' : '새 비밀번호 보기'}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호 변경 재확인</label>
                  <div className="relative">
                    <Input
                      className={`${APP_THEME.classes.formInput} pr-12`}
                      placeholder="비밀번호 변경 재확인"
                      type={showConfirmPassword ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                      onClick={() => setShowConfirmPassword((visible: boolean) => !visible)}
                      aria-label={showConfirmPassword ? '비밀번호 재확인 숨기기' : '비밀번호 재확인 보기'}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <Button className="w-full h-11 text-white font-bold" style={APP_STYLES.primaryButton}>
                  저장하기
                </Button>
              </div>

              <Separator className="my-8" />

              <div>
                <h3 className="text-lg font-black mb-4 text-slate-900">회원 탈퇴</h3>
                <p className="text-sm text-slate-600 mb-4">
                  회원 탈퇴 시 모든 개인 정보와 작성한 게시물이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                </p>
                <Button
                  className="w-full h-11 text-white font-bold"
                  style={APP_STYLES.dangerButton}
                  onClick={handleWithdraw}
                >
                  탈퇴하기
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
