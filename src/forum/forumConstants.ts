export const FORUM_STATUS_MAP: Record<string, { className: string }> = {
  OPEN: {
    className: 'border-emerald-300 text-emerald-700 bg-emerald-50',
  },
  IN_PROGRESS: {
    className: 'border-emerald-300 text-emerald-700 bg-emerald-50',
  },
  UPCOMING: {
    className: 'border-slate-300 text-slate-600 bg-slate-100',
  },
  CLOSED: {
    className: 'border-red-300 text-red-700 bg-red-50',
  },
  ENDED: {
    className: 'border-slate-300 text-slate-600 bg-slate-100',
  },
};

export const DEFAULT_STATUS_BADGE = {
  className: 'border-slate-300 text-slate-700 bg-white',
};
