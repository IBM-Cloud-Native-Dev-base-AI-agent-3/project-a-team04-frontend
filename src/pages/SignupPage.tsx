import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserCircle2 } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppDialog from '@/components/shared/AppDialog';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

export default function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dialog, setDialog] = useState<{ isOpen: boolean; message: string; title: string }>({
    isOpen: false,
    message: '',
    title: '',
  });

  const handleSignup = () => {
    setDialog({
      isOpen: true,
      title: t('auth.signupComplete'),
      message: t('auth.signupCompleteMessage'),
    });
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={false} />
      <AppDialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        primaryButtonLabel="확인"
        onPrimaryClick={() => navigate('/')}
        onClose={() => setDialog({ isOpen: false, message: '', title: '' })}
      />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className={APP_THEME.classes.authFormTitle}>{t('auth.signup')}</h1>
          <p className="text-slate-500 mb-6">{t('auth.enterEmail')}</p>
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-colors overflow-hidden"
              >
                <UserCircle2 size={40} />
              </button>
              <span className="text-xs text-slate-500">{t('auth.profileImageUpload')}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>

            <Input placeholder={t('auth.nickname')} />
            <Input placeholder={t('auth.email')} type="email" />
            <Input placeholder={t('auth.password')} type="password" />
            <Input placeholder={t('auth.passwordConfirm')} type="password" />

            <Button className="w-full h-11 text-white font-bold" style={APP_STYLES.primaryButton} onClick={handleSignup}>
              {t('auth.signup')}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
