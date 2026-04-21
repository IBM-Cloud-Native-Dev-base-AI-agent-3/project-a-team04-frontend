export const FORUM_STATUS_MAP: Record<string, { label: string; className: string }> = {
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
    className: 'border-slate-300 text-slate-600 bg-slate-100',
  },
  CLOSED: {
    label: '모집마감',
    className: 'border-red-300 text-red-700 bg-red-50',
  },
  ENDED: {
    label: '종료',
    className: 'border-slate-300 text-slate-600 bg-slate-100',
  },
};

export const DEFAULT_STATUS_BADGE = {
  className: 'border-slate-300 text-slate-700 bg-white',
};
