import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { UserCircle2 } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import AppDialog from '@/components/shared/AppDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { APP_STYLES, APP_THEME } from '@/constants/theme';
import { fetchMyProfileThunk, updateProfileThunk, withdrawThunk } from '@/user/userThunk';

interface ProfileContainerProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function ProfileContainer({ isLoggedIn, onLogout }: ProfileContainerProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { profile, profileLoading, profileError, withdrawLoading, withdrawError } = useSelector((state: any) => state.user);

  const [nickname, setNickname] = useState('');
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [withdrawalReason, setWithdrawalReason] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchMyProfileThunk());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    setNickname(profile?.nickname ?? '');
    setProfileImagePreview(profile?.profileImageUrl ?? null);
  }, [profile]);

  const handleSaveProfile = async () => {
    const trimmedNickname = nickname.trim();

    setSaveSuccessMessage(null);
    setSaveErrorMessage(null);

    if (!trimmedNickname) {
      setSaveErrorMessage(t('validation.required'));
      return;
    }

    try {
      await dispatch(
        updateProfileThunk({
          nickname: trimmedNickname,
        })
      ).unwrap();

      setSaveSuccessMessage('프로필이 저장되었습니다.');
    } catch (error) {
      const message = typeof error === 'string' ? error : error instanceof Error ? error.message : t('validation.serverError');
      setSaveErrorMessage(message || t('validation.serverError'));
    }
  };

  const handleWithdraw = async () => {
    const reason = withdrawalReason.trim();
    if (!reason) {
      return;
    }

    if (!window.confirm(t('profile.withdrawMessage'))) {
      return;
    }

    try {
      await dispatch(
        withdrawThunk({
          reason,
        })
      ).unwrap();
      onLogout();
      navigate('/');
    } catch {
      // error message is surfaced via redux state
    }
  };

  const profileRoleLabel = profile?.role === 'ROLE_ADMIN' ? 'ADMIN' : t('profile.member');
  const activeDialogMessage = saveErrorMessage || saveSuccessMessage || profileError || withdrawError || '';
  const activeDialogTitle = saveErrorMessage || profileError || withdrawError ? '오류' : '알림';

  const handleDialogClose = () => {
    setSaveErrorMessage(null);
    setSaveSuccessMessage(null);
  };

  const isEmoji = (url: string | null) => {
    if (!url) return false;
    // Simple check for person emoji or any non-URL string
    return url === '👤' || !url.startsWith('http');
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <AppDialog
        isOpen={Boolean(activeDialogMessage)}
        title={activeDialogTitle}
        message={activeDialogMessage}
        onPrimaryClick={handleDialogClose}
        onClose={handleDialogClose}
      />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-3xl mx-auto">
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-black mb-6">{t('profile.profileInfo')}</h2>
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-200">
                  {profileImagePreview ? (
                    isEmoji(profileImagePreview) ? (
                      <span className="text-4xl">{profileImagePreview}</span>
                    ) : (
                      <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                    )
                  ) : (
                    <UserCircle2 size={48} className="text-slate-400" />
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('auth.nickname')}</label>
                  <Input
                    className={APP_THEME.classes.formInput}
                    placeholder={t('auth.nickname')}
                    value={nickname}
                    onChange={(event) => setNickname(event.target.value)}
                    disabled={profileLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('auth.email')}</label>
                  <Input className={APP_THEME.classes.formInput} placeholder={t('auth.email')} type="email" value={profile?.email ?? ''} disabled />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-2">{t('profile.role')}</p>
                  <p className={APP_THEME.classes.bodyText}>{profileRoleLabel}</p>
                </div>
                <Button
                  className="w-full h-11 text-white font-bold"
                  style={APP_STYLES.primaryButton}
                  onClick={handleSaveProfile}
                  disabled={profileLoading || !nickname.trim()}
                >
                  {t('common.save')}
                </Button>
              </div>

              <Separator className="my-8" />

              <div>
                <h3 className="text-lg font-black mb-4 text-slate-900">{t('profile.withdraw')}</h3>
                <p className="text-sm text-slate-600 mb-4">{t('profile.withdrawDescription')}</p>
                <div className="mb-4">
                  <Input
                    className={APP_THEME.classes.formInput}
                    placeholder={t('profile.withdrawalReasonPlaceholder')}
                    value={withdrawalReason}
                    onChange={(e) => setWithdrawalReason(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full h-11 text-white font-bold"
                  style={APP_STYLES.dangerButton}
                  onClick={handleWithdraw}
                  disabled={withdrawLoading || !withdrawalReason.trim()}
                >
                  {withdrawLoading ? '...' : t('profile.withdraw')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}