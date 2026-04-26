import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppDialog from '@/components/shared/AppDialog';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

interface PasswordResetComponentProps {
  step: number;
  email: string;
  setEmail: (email: string) => void;
  newPassword: string;
  setNewPassword: (pw: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (pw: string) => void;
  dialog: { isOpen: boolean; title: string; message: string; onConfirm: () => void };
  closeDialog: () => void;
  onRequest: () => void;
  onConfirm: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function PasswordResetComponent({
  step,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  passwordConfirm,
  setPasswordConfirm,
  dialog,
  closeDialog,
  onRequest,
  onConfirm,
  onBack,
  loading,
}: PasswordResetComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={false} />
      <AppDialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        primaryButtonLabel="확인"
        onPrimaryClick={dialog.onConfirm}
        onClose={closeDialog}
      />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className={APP_THEME.classes.authFormTitle}>{t('auth.passwordReset')}</h1>
          <p className="text-slate-500 mb-6">
            {step === 1 ? t('auth.enterEmail') : t('auth.enterNewPassword')}
          </p>

          <div className="space-y-4">
            {step === 1 ? (
              <>
                <Input
                  placeholder={t('auth.email')}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className="w-full h-11 text-white font-bold"
                  style={APP_STYLES.primaryButton}
                  onClick={onRequest}
                  disabled={loading}
                >
                  {loading ? '...' : t('auth.resetPassword')}
                </Button>
              </>
            ) : (
              <>
                <Input
                  placeholder={t('auth.newPassword')}
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                  placeholder={t('auth.passwordConfirm')}
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <Button
                  className="w-full h-11 text-white font-bold"
                  style={APP_STYLES.primaryButton}
                  onClick={onConfirm}
                  disabled={loading}
                >
                  {loading ? '...' : t('auth.resetPasswordComplete')}
                </Button>
                <Button variant="outline" className="w-full h-11 font-bold" onClick={onBack}>
                  {t('common.back')}
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
