import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const WIS_BLUE = '#0054A6';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader isLoggedIn={false} />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-black mb-2">로그인</h1>
          <p className="text-slate-500 mb-6">계정 정보를 입력해 주세요.</p>
          <div className="space-y-4">
            <Input placeholder="이메일" type="email" defaultValue="user@example.com" />
            <Input placeholder="비밀번호" type="password" defaultValue="password" />
            <Button 
              className="w-full h-11 text-white font-bold" 
              style={{ backgroundColor: WIS_BLUE }}
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
