import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

interface ProfilePageProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function ProfilePage({ isLoggedIn, onLogout }: ProfilePageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const profileAvatarStyle = {
    background: `linear-gradient(135deg, ${APP_THEME.colors.logoBlue}, ${APP_THEME.colors.primary})`,
  };

  const handleWithdraw = () => {
    if (window.confirm(t('profile.withdrawMessage'))) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-3xl mx-auto">
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-black mb-6">{t('profile.profileInfo')}</h2>
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4" style={profileAvatarStyle}>
                  JC
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('auth.nickname')}</label>
                  <Input className={APP_THEME.classes.formInput} placeholder={t('auth.nickname')} defaultValue="JC" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('auth.email')}</label>
                  <Input className={APP_THEME.classes.formInput} placeholder={t('auth.email')} type="email" defaultValue="jc.kim@company.com" disabled />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-2">{t('profile.role')}</p>
                  <p className={APP_THEME.classes.bodyText}>{t('profile.member')}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('auth.currentPassword')}</label>
                  <div className="relative">
                    <Input
                      className={`${APP_THEME.classes.formInput} pr-12`}
                      placeholder={t('auth.currentPassword')}
                      type={showCurrentPassword ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                      onClick={() => setShowCurrentPassword((visible: boolean) => !visible)}
                      aria-label={showCurrentPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('auth.newPassword')}</label>
                  <div className="relative">
                    <Input
                      className={`${APP_THEME.classes.formInput} pr-12`}
                      placeholder={t('auth.newPassword')}
                      type={showNewPassword ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                      onClick={() => setShowNewPassword((visible: boolean) => !visible)}
                      aria-label={showNewPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('profile.passwordChangeConfirm')}</label>
                  <div className="relative">
                    <Input
                      className={`${APP_THEME.classes.formInput} pr-12`}
                      placeholder={t('profile.passwordChangeConfirm')}
                      type={showConfirmPassword ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                      onClick={() => setShowConfirmPassword((visible: boolean) => !visible)}
                      aria-label={showConfirmPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <Button className="w-full h-11 text-white font-bold" style={APP_STYLES.primaryButton}>
                  {t('common.save')}
                </Button>
              </div>

              <Separator className="my-8" />

              <div>
                <h3 className="text-lg font-black mb-4 text-slate-900">{t('profile.withdraw')}</h3>
                <p className="text-sm text-slate-600 mb-4">
                  {t('profile.withdrawDescription')}
                </p>
                <Button
                  className="w-full h-11 text-white font-bold"
                  style={APP_STYLES.dangerButton}
                  onClick={handleWithdraw}
                >
                  {t('profile.withdraw')}
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
