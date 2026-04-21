import { useRef, useState } from 'react';
import { UserCircle2 } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppAlert from '@/components/shared/AppAlert';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

export default function SignupPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);

  const handleSignup = () => {
    setAlert({ tone: 'success', message: '가입이 완료되었습니다. 검증 이메일을 확인해 주세요.' });
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={false} />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className={APP_THEME.classes.authFormTitle}>회원가입</h1>
          <p className="text-slate-500 mb-6">회원 정보를 입력해 가입을 완료하세요.</p>
          {alert && <AppAlert tone={alert.tone} message={alert.message} />}
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-colors overflow-hidden"
              >
                <UserCircle2 size={40} />
              </button>
              <span className="text-xs text-slate-500">프로필 이미지 등록</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>

            <Input placeholder="닉네임" />
            <Input placeholder="이메일" type="email" />
            <Input placeholder="비밀번호" type="password" />
            <Input placeholder="비밀번호 확인" type="password" />

            <Button className="w-full h-11 text-white font-bold" style={APP_STYLES.primaryButton} onClick={handleSignup}>
              가입하기
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
