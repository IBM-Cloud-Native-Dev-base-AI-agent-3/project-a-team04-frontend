import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppDialog from '@/components/shared/AppDialog';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

export default function PasswordResetPage() {
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
        title: '인증 이메일 발송',
        message: '가입하신 이메일로 비밀번호 재설정 링크를 보냈습니다.',
        isValid: true,
      });
    } else if (isValidEmail) {
      setDialog({
        isOpen: true,
        title: '가입되지 않은 이메일',
        message: '입력하신 이메일로 가입된 계정이 없습니다.',
        isValid: false,
      });
    } else {
      setDialog({
        isOpen: true,
        title: '올바른 이메일 입력',
        message: '올바른 이메일 주소를 입력해주세요.',
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
        tone={dialog.isValid ? 'success' : 'error'}
        primaryButtonLabel={dialog.isValid ? '비밀번호 설정하기' : '확인'}
        onPrimaryClick={handleDialogConfirm}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
      />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className={APP_THEME.classes.authFormTitle}>비밀번호 재설정</h1>
          <p className="text-slate-500 mb-6">
            {step === 1 ? '이메일을 입력해 주세요.' : '새로운 비밀번호를 입력해 주세요.'}
          </p>

          <div className="space-y-4">
            {step === 1 ? (
              <>
                <Input
                  placeholder="이메일 주소"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className="w-full h-11 text-white font-bold"
                  style={APP_STYLES.primaryButton}
                  onClick={handleResetRequest}
                >
                  재설정
                </Button>
              </>
            ) : (
              <>
                <Input placeholder="새로운 비밀번호" type="password" />
                <Input placeholder="비밀번호 확인" type="password" />
                <Button
                  className="w-full h-11 text-white font-bold"
                  style={APP_STYLES.primaryButton}
                  onClick={() => {
                    setDialog({
                      isOpen: true,
                      title: '비밀번호 재설정 완료',
                      message: '비밀번호가 안전하게 재설정되었습니다.',
                      isValid: true,
                    });
                    setStep(1);
                  }}
                >
                  재설정하기
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 font-bold"
                  onClick={() => setStep(1)}
                >
                  이전
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
