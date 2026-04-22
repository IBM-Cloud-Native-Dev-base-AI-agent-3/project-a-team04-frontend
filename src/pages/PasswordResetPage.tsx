import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppDialog from '@/components/shared/AppDialog';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

export default function PasswordResetPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [dialog, setDialog] = useState<{ isOpen: boolean; message: string; title: string; isValid: boolean }>({
    isOpen: false,
    message: '',
    title: '',
    isValid: false,
  });

  const handleResetRequest = () => {
    // Brevo 이메일 API 호출 시뮬레이션
    // 실제로는 여기서 이메일이 가입되어 있는지 확인하고 검증 이메일을 보냄
    const isValidEmail = email.includes('@') && email.length > 0;
    const isRegistered = email === 'jc.kim@company.com'; // 예시: 이 이메일이 가입되어 있다고 가정

    if (isRegistered) {
      setDialog({
        isOpen: true,
        title: t('auth.emailVerification'),
        message: t('auth.emailVerificationSent'),
        isValid: true,
      });
    } else if (isValidEmail) {
      setDialog({
        isOpen: true,
        title: t('auth.emailNotRegistered'),
        message: t('auth.emailNotRegisteredMessage'),
        isValid: false,
      });
    } else {
      setDialog({
        isOpen: true,
        title: t('auth.invalidEmail'),
        message: t('auth.invalidEmailMessage'),
        isValid: false,
      });
    }
  };

  const handleDialogConfirm = () => {
    if (dialog.isValid) {
      setStep(2);
      setEmail('');
    }
    setDialog({ ...dialog, isOpen: false });
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={false} />
      <AppDialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        primaryButtonLabel={dialog.isValid ? '비밀번호 설정하기' : '확인'}
        onPrimaryClick={handleDialogConfirm}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
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
                  onClick={handleResetRequest}
                >
                  {t('auth.resetPassword')}
                </Button>
              </>
            ) : (
              <>
                <Input placeholder={t('auth.newPassword')} type="password" />
                <Input placeholder={t('auth.passwordConfirm')} type="password" />
                <Button
                  className="w-full h-11 text-white font-bold"
                  style={APP_STYLES.primaryButton}
                  onClick={() => {
                    setDialog({
                      isOpen: true,
                      title: t('auth.passwordResetComplete'),
                      message: t('auth.passwordResetCompleteMessage'),
                      isValid: true,
                    });
                    setStep(1);
                  }}
                >
                  {t('auth.resetPasswordComplete')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 font-bold"
                  onClick={() => setStep(1)}
                >
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
