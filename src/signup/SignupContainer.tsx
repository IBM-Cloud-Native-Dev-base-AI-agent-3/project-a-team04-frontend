import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { signupThunk } from '@/service/userThunk';
import SignupComponent from './SignupComponent';

export default function SignupContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { signupLoading } = useSelector((state: any) => state.user);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [alert, setAlert] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);
  const [dialog, setDialog] = useState<{ isOpen: boolean; message: string; title: string }>({
    isOpen: false,
    message: '',
    title: '',
  });

  const handleSignup = async () => {
    if (!nickname || !email || !password || !passwordConfirm) {
      setAlert({ tone: 'error', message: t('validation.required') });
      return;
    }

    if (password !== passwordConfirm) {
      setAlert({ tone: 'error', message: t('validation.passwordMismatch') });
      return;
    }

    try {
      setAlert(null);

      await dispatch(
        signupThunk({
          email,
          password,
          nickname,
          role: 'ROLE_USER',
        })
      ).unwrap();

      setDialog({
        isOpen: true,
        title: t('auth.signupComplete'),
        message: t('auth.signupCompleteMessage'),
      });
    } catch {
      setAlert({ tone: 'error', message: t('validation.serverError') });
    }
  };

  return (
    <SignupComponent
      nickname={nickname}
      email={email}
      password={password}
      passwordConfirm={passwordConfirm}
      loading={signupLoading}
      alert={alert}
      dialog={dialog}
      fileInputRef={fileInputRef}
      onNicknameChange={setNickname}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onPasswordConfirmChange={setPasswordConfirm}
      onOpenFilePicker={() => fileInputRef.current?.click()}
      onSubmit={handleSignup}
      onDialogPrimaryClick={() => navigate('/')}
      onDialogClose={() => setDialog({ isOpen: false, message: '', title: '' })}
      t={t}
    />
  );
}
