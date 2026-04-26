import { useTranslation } from 'react-i18next';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { APP_STYLES, APP_THEME } from '@/constants/theme';
import { FORUM_STATUS_MAP, DEFAULT_STATUS_BADGE } from './forumConstants';

interface ForumDetailComponentProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
  forum: any;
  myRegistration: any;
  loading: boolean;
  error: string | null;
  onBack: () => void;
  onApply: () => void;
  applyLoading: boolean;
}

export default function ForumDetailComponent({
  isLoggedIn,
  onLogout,
  forum,
  myRegistration,
  loading,
  error,
  onBack,
  onApply,
  applyLoading,
}: ForumDetailComponentProps) {
  const { t } = useTranslation();

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error || !forum) return <div className="text-center py-20 text-red-500">{error || 'Forum not found'}</div>;

  const statusBadge = FORUM_STATUS_MAP[forum.status] ?? DEFAULT_STATUS_BADGE;
  const statusLabel = t(`forum.statuses.${forum.status}`, { defaultValue: forum.status });

  // 신청 버튼 상태 렌더링 함수
  const renderApplyButton = () => {
    if (!myRegistration) {
      return (
        <Button
          className="flex-1 h-11 text-white font-bold"
          style={APP_STYLES.primaryButton}
          onClick={onApply}
          disabled={applyLoading}
        >
          {applyLoading ? '...' : t('forum.apply')}
        </Button>
      );
    }

    const { status } = myRegistration;
    switch (status) {
      case 'WAITING':
        return (
          <Button className="flex-1 h-11 bg-slate-400 text-white font-bold hover:bg-slate-400 cursor-default" disabled>
            승인 대기 중
          </Button>
        );
      case 'ACCEPTED':
        return (
          <Button className="flex-1 h-11 bg-green-500 text-white font-bold hover:bg-green-500 cursor-default" disabled>
            승인 완료
          </Button>
        );
      case 'REJECTED':
        return (
          <Button className="flex-1 h-11 bg-red-500 text-white font-bold hover:bg-red-500 cursor-default" disabled>
            승인 거절
          </Button>
        );
      default:
        return (
          <Button className="flex-1 h-11 text-white font-bold" style={APP_STYLES.primaryButton} onClick={onApply}>
            {t('forum.apply')}
          </Button>
        );
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
    return url;
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-4xl mx-auto">
          <BackButton onClick={onBack} />

          <Card className="border border-slate-200 shadow-sm mb-8">
            <CardContent className="p-8">
              <h1 className="text-3xl font-black text-slate-900 mb-4">{forum.title}</h1>

              <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-slate-200">
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold ${statusBadge.className}`}>
                  {statusLabel}
                </span>
                <span className="text-sm text-slate-600 font-medium">{t('forum.date')}: {forum.eventDate}</span>
                <span className="text-sm text-slate-600 font-medium">{t('forum.location')}: {forum.location || '-'}</span>
                <span className="text-sm text-slate-600 font-medium">{t('forum.speaker')}: {forum.speaker || '-'}</span>
                <span className="text-sm text-slate-600 font-medium">
                  {t('forum.applicantStatus')}: {forum.applicantCount || 0} / {forum.maxParticipants}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">{t('forum.forumIntroduction')}</h2>
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {forum.content}
                </div>
              </div>

              {/* Media Section */}
              {forum.media && forum.media.length > 0 && (
                <div className="mb-8 space-y-4">
                  {forum.media.map((m: any, idx: number) => (
                    <div key={idx} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                      {m.type === 'youtube' ? (
                        <iframe
                          title={`forum-media-${idx}`}
                          src={getYouTubeEmbedUrl(m.url)}
                          className="h-[420px] w-full"
                          allowFullScreen
                        />
                      ) : (
                        <img src={m.url} alt="forum" className="w-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                {renderApplyButton()}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
