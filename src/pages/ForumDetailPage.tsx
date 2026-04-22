import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FORUMS } from '@/data/forums';
import { APP_STYLES, APP_THEME } from '@/constants/theme';
import { FORUM_STATUS_MAP, DEFAULT_STATUS_BADGE } from '@/constants/forum';

interface ForumDetailPageProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export default function ForumDetailPage({ isLoggedIn, onLogout }: ForumDetailPageProps) {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const id = pathname.split('/')[2];
  const forum = FORUMS.find(f => f.id === id) || FORUMS[0];

  const statusBadge = FORUM_STATUS_MAP[forum.status] ?? { label: forum.status, ...DEFAULT_STATUS_BADGE };

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url;
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-4xl mx-auto">
          <BackButton onClick={() => navigate('/forum-guide')} />

          <Card className="border border-slate-200 shadow-sm mb-8">
            <CardContent className="p-8">
              <h1 className="text-3xl font-black text-slate-900 mb-4">{forum.title}</h1>

              <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-slate-200">
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold ${statusBadge.className}`}>
                  {statusBadge.label}
                </span>
                <span className="text-sm text-slate-600 font-medium">일시: {forum.date} | 13:00 ~ 15:00</span>
                <span className="text-sm text-slate-600 font-medium">장소: {forum.place}</span>
                <span className="text-sm text-slate-600 font-medium">연사: {forum.speaker}</span>
                <span className="text-sm text-slate-600 font-medium">
                  신청 현황: {forum.applicantCount} / {forum.maxParticipants}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">포럼 소개</h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {forum.content}
                </p>
              </div>

              <div className="mb-8 space-y-4">
                {forum.media.map((media, index) => (
                  <div key={`${media.type}-${media.url}-${index}`} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                    {media.type === 'youtube' ? (
                      <iframe
                        title={`forum-media-${index}`}
                        src={getYouTubeEmbedUrl(media.url)}
                        className="h-[420px] w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    ) : (
                      <img
                        src={media.url}
                        alt={`포럼 미디어 ${index + 1}`}
                        className="w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 h-11 text-white font-bold" style={APP_STYLES.primaryButton}>
                  신청하기
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
