import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppAlert from '@/components/shared/AppAlert';
import { APP_STYLES, APP_THEME } from '@/constants/theme';
import { DUMMY_USERS, type DummyUser } from '@/data/dummyUsers';

interface LoginPageProps {
  onLogin: (user: DummyUser) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('user1@example.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);

  const handleLogin = () => {
    const matchedUser = DUMMY_USERS.find((user) => user.email === email && user.password === password);

    if (matchedUser) {
      onLogin(matchedUser);
      navigate('/');
      return;
    }

    setAlert({ tone: 'error', message: t('validation.invalidEmail') });
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={false} />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className={APP_THEME.classes.authFormTitle}>{t('auth.login')}</h1>
          <p className="text-slate-500 mb-6">{t('auth.enterEmail')}</p>
          {alert && <AppAlert tone={alert.tone} message={alert.message} />}
          <div className="space-y-4">
            <Input placeholder={t('auth.email')} type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <div className="relative">
              <input
                placeholder={t('auth.password')}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full h-11 px-4 pr-12 text-base border border-slate-200 rounded-lg outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              className="text-sm font-semibold text-brand-primary hover:underline"
              onClick={() => navigate('/password-reset')}
              type="button"
            >
              {t('auth.forgotPassword')}
            </button>
            <Button
              className="w-full h-11 text-white font-bold" 
              style={APP_STYLES.primaryButton}
              onClick={handleLogin}
            >
              {t('auth.login')}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
