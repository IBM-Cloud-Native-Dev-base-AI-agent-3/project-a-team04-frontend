import { UserCircle2 } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppDialog from '@/components/shared/AppDialog';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

interface SignupComponentProps {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  loading: boolean;
  alert: { tone: 'success' | 'error'; message: string } | null;
  dialog: { isOpen: boolean; message: string; title: string };
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onNicknameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
  onOpenFilePicker: () => void;
  onSubmit: () => void;
  onDialogPrimaryClick: () => void;
  onDialogClose: () => void;
  onAlertClose: () => void;
  t: (key: string) => string;
}

export default function SignupComponent({
  nickname,
  email,
  password,
  passwordConfirm,
  loading,
  alert,
  dialog,
  fileInputRef,
  onNicknameChange,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onOpenFilePicker,
  onSubmit,
  onDialogPrimaryClick,
  onDialogClose,
  onAlertClose,
  t,
}: SignupComponentProps) {
  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={false} />
      <AppDialog
        isOpen={Boolean(alert)}
        title="알림"
        message={alert?.message || ''}
        onPrimaryClick={onAlertClose}
        onClose={onAlertClose}
      />
      <AppDialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        primaryButtonLabel="확인"
        onPrimaryClick={onDialogPrimaryClick}
        onClose={onDialogClose}
      />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className={APP_THEME.classes.authFormTitle}>{t('auth.signup')}</h1>
          <p className="text-slate-500 mb-6">{t('auth.enterEmail')}</p>
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={onOpenFilePicker}
                className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-colors overflow-hidden"
              >
                <UserCircle2 size={40} />
              </button>
              <span className="text-xs text-slate-500">{t('auth.profileImageUpload')}</span>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
            </div>

            <Input placeholder={t('auth.nickname')} value={nickname} onChange={(event) => onNicknameChange(event.target.value)} />
            <Input placeholder={t('auth.email')} type="email" value={email} onChange={(event) => onEmailChange(event.target.value)} />
            <Input placeholder={t('auth.password')} type="password" value={password} onChange={(event) => onPasswordChange(event.target.value)} />
            <Input
              placeholder={t('auth.passwordConfirm')}
              type="password"
              value={passwordConfirm}
              onChange={(event) => onPasswordConfirmChange(event.target.value)}
            />

            <Button className="w-full h-11 text-white font-bold" style={APP_STYLES.primaryButton} onClick={onSubmit} disabled={loading}>
              {loading ? 'Loading...' : t('auth.signup')}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
