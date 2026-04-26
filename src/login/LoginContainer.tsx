import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '@/service/authThunk';
import LoginComponent from './LoginComponent';

interface User {
  id: number;
  email: string;
  name: string;
}

interface LoginContainerProps {
  onLogin: (user: User) => void;
}

export default function LoginContainer({ onLogin }: LoginContainerProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { loginLoading } = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState('user1@example.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);

  const handleLogin = async () => {
    try {
      setAlert(null);

      await dispatch(
        loginThunk({
          email,
          password,
        })
      ).unwrap();

      const user: User = {
        id: 1,
        email,
        name: email.split('@')[0],
      };

      onLogin(user);
      navigate('/');
    } catch {
      setAlert({ tone: 'error', message: t('validation.invalidEmail') });
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
      t={t}
    />
  );
}
