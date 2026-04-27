import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '@/auth/authThunk';
import { fetchMyProfileThunk } from '@/user/userThunk';
import LoginComponent from './LoginComponent';

interface User {
  id: number;
  email: string;
  nickname: string;
}

interface LoginContainerProps {
  onLogin: (user: User) => void;
}

export default function LoginContainer({ onLogin }: LoginContainerProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { loginLoading } = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);

  const handleLogin = async () => {
    const normalizedEmail = email.trim();

    try {
      setAlert(null);

      await dispatch(
        loginThunk({
          email: normalizedEmail,
          password,
        })
      ).unwrap();
    } catch (error) {
      const message = error instanceof Error ? error.message : t('validation.invalidEmail');
      setAlert({ tone: 'error', message });
      return;
    }

    try {
      // Fetch actual profile to get the real userId
      const profile = await dispatch(fetchMyProfileThunk()).unwrap();

      const user: User = {
        id: profile.id,
        email: profile.email,
        nickname: profile.nickname,
      };

      onLogin(user);
      navigate('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : t('validation.serverError');
      setAlert({ tone: 'error', message });
    }
  };

  return (
    <LoginComponent
      email={email}
      password={password}
      showPassword={showPassword}
      loading={loginLoading}
      alert={alert}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onToggleShowPassword={() => setShowPassword((prev) => !prev)}
      onSubmit={handleLogin}
      onMovePasswordReset={() => navigate('/password-reset')}
      onAlertClose={() => setAlert(null)}
      t={t}
    />
  );
}
