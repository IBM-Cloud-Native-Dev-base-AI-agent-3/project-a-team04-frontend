import { Eye, EyeOff } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppAlert from '@/components/shared/AppAlert';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

interface LoginComponentProps {
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  alert: { tone: 'success' | 'error'; message: string } | null;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onToggleShowPassword: () => void;
  onSubmit: () => void;
  onMovePasswordReset: () => void;
  t: (key: string) => string;
}

export default function LoginComponent({
  email,
  password,
  showPassword,
  loading,
  alert,
  onEmailChange,
  onPasswordChange,
  onToggleShowPassword,
  onSubmit,
  onMovePasswordReset,
  t,
}: LoginComponentProps) {
  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={false} />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className={APP_THEME.classes.authFormTitle}>{t('auth.login')}</h1>
          <p className="text-slate-500 mb-6">{t('auth.enterEmail')}</p>
          {alert && <AppAlert tone={alert.tone} message={alert.message} />}
          <div className="space-y-4">
            <Input placeholder={t('auth.email')} type="email" value={email} onChange={(event) => onEmailChange(event.target.value)} />
            <div className="relative">
              <input
                placeholder={t('auth.password')}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                className="w-full h-11 px-4 pr-12 text-base border border-slate-200 rounded-lg outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition-colors"
                onClick={onToggleShowPassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button className="text-sm font-semibold text-brand-primary hover:underline" onClick={onMovePasswordReset} type="button">
              {t('auth.forgotPassword')}
            </button>
            <Button className="w-full h-11 text-white font-bold" style={APP_STYLES.primaryButton} onClick={onSubmit} disabled={loading}>
              {loading ? t('common.loading') : t('auth.login')}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
