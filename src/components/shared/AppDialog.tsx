interface AppDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  tone?: 'success' | 'error' | 'info';
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
  onClose?: () => void;
}

const toneStyles: Record<NonNullable<AppDialogProps['tone']>, string> = {
  success: 'border-emerald-300 bg-emerald-50',
  error: 'border-red-300 bg-red-50',
  info: 'border-blue-300 bg-blue-50',
};

const toneIconStyles: Record<NonNullable<AppDialogProps['tone']>, string> = {
  success: 'bg-emerald-100 text-emerald-600',
  error: 'bg-red-100 text-red-600',
  info: 'bg-blue-100 text-blue-600',
};

const toneTextStyles: Record<NonNullable<AppDialogProps['tone']>, string> = {
  success: 'text-emerald-800',
  error: 'text-red-800',
  info: 'text-blue-800',
};

export default function AppDialog({
  isOpen,
  title,
  message,
  tone = 'info',
  primaryButtonLabel = '확인',
  secondaryButtonLabel,
  onPrimaryClick,
  onSecondaryClick,
  onClose,
}: AppDialogProps) {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    onClose?.();
  };

  const iconMap = {
    success: '✓',
    error: '!',
    info: 'ℹ',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      {/* Dialog */}
      <div className={`relative z-10 w-full max-w-sm mx-4 rounded-2xl border px-6 py-8 shadow-2xl bg-white ${toneStyles[tone]}`}>
        {/* Icon */}
        <div className={`mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${toneIconStyles[tone]}`}>
          {iconMap[tone]}
        </div>

        {/* Title */}
        <h2 className={`text-center text-lg font-bold mb-2 ${toneTextStyles[tone]}`}>
          {title}
        </h2>

        {/* Message */}
        <p className={`text-center text-sm mb-6 ${toneTextStyles[tone]}`}>
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          {secondaryButtonLabel && (
            <button
              type="button"
              onClick={() => {
                onSecondaryClick?.();
                onClose?.();
              }}
              className="flex-1 px-4 py-3 rounded-lg border-2 font-semibold transition-colors"
              style={{
                borderColor: tone === 'success' ? '#d1fae5' : tone === 'error' ? '#fee2e2' : '#dbeafe',
                color: tone === 'success' ? '#059669' : tone === 'error' ? '#dc2626' : '#2563eb',
              }}
            >
              {secondaryButtonLabel}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onPrimaryClick();
              onClose?.();
            }}
            className="flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-colors"
            style={{
              backgroundColor: tone === 'success' ? '#10b981' : tone === 'error' ? '#ef4444' : '#3b82f6',
            }}
          >
            {primaryButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
