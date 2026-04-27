const SERVER_LOCAL_DATETIME_REGEX = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/;

function parseForumDate(value: string): Date | null {
  const normalized = value.trim();
  const localMatch = normalized.match(SERVER_LOCAL_DATETIME_REGEX);

  // Treat naive datetime from server as KST to avoid browser locale/timezone drift.
  if (localMatch) {
    const [, year, month, day, hour, minute, second] = localMatch;
    const utcTimestamp = Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour) - 9,
      Number(minute),
      Number(second)
    );
    return new Date(utcTimestamp);
  }

  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function normalizeLocale(locale?: string): string {
  if (!locale) return 'ko-KR';
  if (locale.toLowerCase().startsWith('ko')) return 'ko-KR';
  if (locale.toLowerCase().startsWith('en')) return 'en-US';
  return locale;
}

export function formatForumDate(value?: string | null, locale?: string): string {
  if (!value) return '-';

  const parsedDate = parseForumDate(value);
  if (!parsedDate) return value;

  return new Intl.DateTimeFormat(normalizeLocale(locale), {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(parsedDate);
}