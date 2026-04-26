import { Card, CardContent } from '@/components/ui/card';
import { FORUM_STATUS_MAP, DEFAULT_STATUS_BADGE } from '@/forum/forumConstants';
import { useTranslation } from 'react-i18next';

interface ForumCardProps {
  id: string;
  title: string;
  desc: string;
  date: string;
  place: string;
  status: string;
  thumbnail: string;
  speaker: string;
  applicantCount: number;
  maxParticipants: number;
  onClick: () => void;
}

export default function ForumCard({
  title,
  desc,
  date,
  place,
  status,
  thumbnail,
  speaker,
  applicantCount,
  maxParticipants,
  onClick,
}: ForumCardProps) {
  const { t } = useTranslation();
  const statusBadge = FORUM_STATUS_MAP[status] ?? DEFAULT_STATUS_BADGE;
  const statusLabel = t(`forum.statuses.${status}`, { defaultValue: status });

  return (
    <Card 
      className="rounded-none overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow bg-white cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4 overflow-hidden rounded-none">
          <img
            src={thumbnail}
            alt={title}
            className="h-[calc(14rem*1.3)] w-full rounded-none object-cover transition-transform duration-500 hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        <h2 className="text-xl font-black text-slate-900 mb-2 leading-snug">{title}</h2>
        <p className="text-sm text-slate-500 mb-4 flex-1">{desc}</p>

        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex justify-between gap-3">
            <span className="font-medium text-slate-500">{t('forum.schedule')}</span>
            <span className="font-semibold text-slate-800 text-right">{date}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="font-medium text-slate-500">{t('forum.location')}</span>
            <span className="font-semibold text-slate-800 text-right">{place}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="font-medium text-slate-500">{t('forum.speaker')}</span>
            <span className="font-semibold text-slate-800 text-right">{speaker}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="font-medium text-slate-500">{t('forum.applicantStatus')}</span>
            <span className="font-semibold text-slate-800 text-right">
              {applicantCount} / {maxParticipants}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="font-medium text-slate-500">{t('forum.status')}</span>
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold ${statusBadge.className}`}>
              {statusLabel}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
