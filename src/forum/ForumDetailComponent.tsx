import { useTranslation } from 'react-i18next';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { APP_STYLES, APP_THEME } from '@/constants/theme';
import { formatForumDate } from './forumDate';

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
  const { t, i18n } = useTranslation();

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error || !forum) return <div className="text-center py-20 text-red-500">{error || 'Forum not found'}</div>;

  const statusLabel = forum.statusLabel || forum.status || '-';
  const locale = i18n.language.split('-')[0].toLowerCase();
  const selectedTranslation =
    forum.translations?.find((tr: any) => (tr.locale || '').toLowerCase() === locale) || forum.translations?.[0];

  const displayTitle = selectedTranslation?.title || forum.title || '-';
  const description = selectedTranslation?.description || forum.description || forum.content || '-';
  const displayLocation = selectedTranslation?.location || forum.location || '-';
  const displaySpeakers = selectedTranslation?.speakers || forum.speakers || '-';
  const acceptedCount = forum.acceptedCount ?? forum.applicantCount ?? 0;
  const sortedMedia = [...(forum.media || [])].sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

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
    let embedUrl = url;

    if (url.includes('watch?v=')) {
      embedUrl = url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be/')) {
      embedUrl = `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split('?')[0]}`;
    }

    try {
      const parsed = new URL(embedUrl);
      parsed.searchParams.set('autoplay', '1');
      parsed.searchParams.set('mute', '1');
      parsed.searchParams.set('playsinline', '1');
      return parsed.toString();
    } catch {
      return embedUrl;
    }
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-4xl mx-auto">
          <BackButton onClick={onBack} />

          <Card className="border border-slate-200 shadow-sm mb-8">
            <CardContent className="p-8">
              <h1 className="text-3xl font-black text-slate-900 mb-4">{displayTitle}</h1>

              <div className="mb-8">
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap mb-6">{description}</div>

                <div className="space-y-2">
                  <div className="text-sm text-slate-700">상태: {statusLabel}</div>
                  <div className="text-sm text-slate-700">{t('forum.date')}: {formatForumDate(forum.eventDate, i18n.language)}</div>
                  <div className="text-sm text-slate-700">{t('forum.location')}: {displayLocation}</div>
                  <div className="text-sm text-slate-700">{t('forum.speaker')}: {displaySpeakers}</div>
                  <div className="text-sm text-slate-700">{t('forum.applicantStatus')}: {acceptedCount} / {forum.maxParticipants ?? '-'}</div>
                </div>
              </div>

              {/* Media Section */}
              {sortedMedia.length > 0 && (
                <div className="mb-8 space-y-4">
                  {sortedMedia.map((m: any, idx: number) => (
                    <div key={idx} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                      {(m.mediaType || m.type || '').toUpperCase() === 'YOUTUBE' || m.url?.includes('youtube.com') || m.url?.includes('youtu.be') ? (
                        <iframe
                          title={`forum-media-${idx}`}
                          src={getYouTubeEmbedUrl(m.url)}
                          className="h-[420px] w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
