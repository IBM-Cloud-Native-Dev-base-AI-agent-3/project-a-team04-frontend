import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { signupThunk } from '@/user/userThunk';
import { uploadFile } from '@/user/userService';
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
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);
  const [dialog, setDialog] = useState<{ isOpen: boolean; message: string; title: string }>({
    isOpen: false,
    message: '',
    title: '',
  });

  const isWithdrawalRestrictionError = (message: string) => /USER_WITHDRAWALS|30일|30 days|withdrawal/i.test(message);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

      let profileImageUrl = '👤'; // Default person emoji
      if (profileImage) {
        const uploadRes = await uploadFile(profileImage);
        profileImageUrl = uploadRes.url;
      }

      await dispatch(
        signupThunk({
          email,
          password,
          nickname,
          role: 'ROLE_USER',
          profileImageUrl,
        } as any)
      ).unwrap();

      setDialog({
        isOpen: true,
        title: t('auth.signupComplete'),
        message: t('auth.signupCompleteMessage'),
      });
    } catch (error) {
      const message = typeof error === 'string' ? error : error instanceof Error ? error.message : '';

      if (isWithdrawalRestrictionError(message)) {
        setAlert({ tone: 'error', message: t('auth.signupWithdrawalRestricted') });
        return;
      }

      setAlert({ tone: 'error', message: message || t('validation.serverError') });
    }
  };

  return (
    <SignupComponent
      nickname={nickname}
      email={email}
      password={password}
      passwordConfirm={passwordConfirm}
      profileImagePreview={profileImagePreview}
      loading={signupLoading}
      alert={alert}
      dialog={dialog}
      fileInputRef={fileInputRef}
      onNicknameChange={setNickname}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onPasswordConfirmChange={setPasswordConfirm}
      onFileChange={handleFileChange}
      onOpenFilePicker={() => fileInputRef.current?.click()}
      onSubmit={handleSignup}
      onDialogPrimaryClick={() => navigate('/')}
      onDialogClose={() => setDialog({ isOpen: false, message: '', title: '' })}
      onAlertClose={() => setAlert(null)}
      t={t}
    />
  );
}
