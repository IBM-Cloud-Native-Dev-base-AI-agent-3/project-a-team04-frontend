import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FORUMS } from '@/data/forums';

const WIS_BLUE = '#0054A6';

interface ForumDetailPageProps {
  isLoggedIn: boolean;
}

export default function ForumDetailPage({ isLoggedIn }: ForumDetailPageProps) {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const id = pathname.split('/')[2];
  const forum = FORUMS.find(f => f.id === id) || FORUMS[0];

  const statusMap: Record<string, { label: string; className: string }> = {
    OPEN: {
      label: '모집중',
      className: 'border-emerald-300 text-emerald-700 bg-emerald-50',
    },
    IN_PROGRESS: {
      label: '진행중',
      className: 'border-blue-300 text-blue-700 bg-blue-50',
    },
    UPCOMING: {
      label: '예정',
      className: 'border-violet-300 text-violet-700 bg-violet-50',
    },
    CLOSED: {
      label: '모집마감',
      className: 'border-amber-300 text-amber-700 bg-amber-50',
    },
    ENDED: {
      label: '종료',
      className: 'border-slate-300 text-slate-600 bg-slate-100',
    },
  };

  const statusBadge = statusMap[forum.status] ?? {
    label: forum.status,
    className: 'border-slate-300 text-slate-700 bg-white',
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader isLoggedIn={isLoggedIn} />
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
                <h2 className="text-xl font-bold">포럼 미디어</h2>
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
                <Button className="flex-1 h-11 text-white font-bold" style={{ backgroundColor: WIS_BLUE }}>
                  포럼 등록
                </Button>
                <Button variant="outline" className="h-11 px-6 font-bold">
                  수정
                </Button>
                <Button variant="outline" className="h-11 px-6 font-bold text-red-600 border-red-200">
                  삭제
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
