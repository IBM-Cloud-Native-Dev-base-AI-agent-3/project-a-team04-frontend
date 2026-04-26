import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { requestPasswordResetThunk, confirmPasswordResetThunk } from '@/auth/authThunk';
import { clearPasswordResetRequestState, clearPasswordResetConfirmState } from '@/auth/authSlice';
import PasswordResetComponent from './PasswordResetComponent';

export default function PasswordResetContainer() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token');

  const [step, setStep] = useState(tokenFromUrl ? 2 : 1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const {
    passwordResetRequestLoading,
    passwordResetRequestResult,
    passwordResetRequestError,
    passwordResetConfirmLoading,
    passwordResetConfirmResult,
    passwordResetConfirmError,
  } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (passwordResetRequestResult === 1) {
      setDialog({
        isOpen: true,
        title: '요청 완료',
        message: '이메일로 전송된 링크를 확인해주세요.',
        onConfirm: () => {
          setDialog((d) => ({ ...d, isOpen: false }));
          dispatch(clearPasswordResetRequestState());
        },
      });
    } else if (passwordResetRequestResult === -1 || passwordResetRequestError) {
      setDialog({
        isOpen: true,
        title: '요청 실패',
        message: passwordResetRequestError || '인증된 이메일이 아닙니다.',
        onConfirm: () => {
          setDialog((d) => ({ ...d, isOpen: false }));
          dispatch(clearPasswordResetRequestState());
        },
      });
    }
  }, [passwordResetRequestResult, passwordResetRequestError, dispatch]);

  useEffect(() => {
    if (passwordResetConfirmResult === 1) {
      setDialog({
        isOpen: true,
        title: '설정 완료',
        message: '비밀번호가 성공적으로 변경되었습니다.',
        onConfirm: () => {
          setDialog((d) => ({ ...d, isOpen: false }));
          dispatch(clearPasswordResetConfirmState());
          navigate('/login');
        },
      });
    } else if (passwordResetConfirmResult === -1 || passwordResetConfirmError) {
      setDialog({
        isOpen: true,
        title: '설정 실패',
        message: passwordResetConfirmError || '비밀번호 재설정에 실패했습니다.',
        onConfirm: () => {
          setDialog((d) => ({ ...d, isOpen: false }));
          dispatch(clearPasswordResetConfirmState());
        },
      });
    }
  }, [passwordResetConfirmResult, passwordResetConfirmError, dispatch, navigate]);

  const handleRequest = () => {
    if (!email) return;
    dispatch(requestPasswordResetThunk({ email }));
  };

  const handleConfirm = () => {
    if (!newPassword || newPassword !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    const token = tokenFromUrl || ''; // 실제로는 이메일 링크를 통해 토큰을 받아옴
    dispatch(confirmPasswordResetThunk({ token, newPassword }));
  };

  return (
    <PasswordResetComponent
      step={step}
      email={email}
      setEmail={setEmail}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      passwordConfirm={passwordConfirm}
      setPasswordConfirm={setPasswordConfirm}
      dialog={dialog}
      closeDialog={() => setDialog((d) => ({ ...d, isOpen: false }))}
      onRequest={handleRequest}
      onConfirm={handleConfirm}
      onBack={() => setStep(1)}
      loading={passwordResetRequestLoading || passwordResetConfirmLoading}
    />
  );
}
