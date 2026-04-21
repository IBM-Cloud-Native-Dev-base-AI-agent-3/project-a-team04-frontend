import { Card, CardContent } from '@/components/ui/card';

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
  const statusBadge = statusMap[status] ?? {
    label: status,
    className: 'border-slate-300 text-slate-700 bg-white',
  };

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
            <span className="font-medium text-slate-500">일정</span>
            <span className="font-semibold text-slate-800 text-right">{date}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="font-medium text-slate-500">장소</span>
            <span className="font-semibold text-slate-800 text-right">{place}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="font-medium text-slate-500">상태</span>
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold ${statusBadge.className}`}>
              {statusBadge.label}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="font-medium text-slate-500">연사</span>
            <span className="font-semibold text-slate-800 text-right">{speaker}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="font-medium text-slate-500">신청 현황</span>
            <span className="font-semibold text-slate-800 text-right">
              {applicantCount} / {maxParticipants}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
