import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppAlert from '@/components/shared/AppAlert';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [alert, setAlert] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password') {
      onLogin();
      navigate('/');
      return;
    }

    setAlert({ tone: 'error', message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={false} />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className={APP_THEME.classes.authFormTitle}>로그인</h1>
          <p className="text-slate-500 mb-6">계정 정보를 입력해 주세요.</p>
          {alert && <AppAlert tone={alert.tone} message={alert.message} />}
          <div className="space-y-4">
            <Input placeholder="이메일" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Input placeholder="비밀번호" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button
              className="text-sm font-semibold text-brand-primary hover:underline"
              onClick={() => navigate('/password-reset')}
              type="button"
            >
              비밀번호 재설정
            </button>
            <Button
              className="w-full h-11 text-white font-bold" 
              style={APP_STYLES.primaryButton}
              onClick={handleLogin}
            >
              로그인
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
