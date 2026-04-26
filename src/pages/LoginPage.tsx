import LoginContainer from '@/login/LoginContainer';

interface User {
  id: number;
  email: string;
  name: string;
}

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  return <LoginContainer onLogin={onLogin} />;
}
