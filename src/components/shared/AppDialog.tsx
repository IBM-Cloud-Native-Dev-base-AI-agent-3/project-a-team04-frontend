import { APP_THEME, APP_STYLES } from '@/constants/theme';

interface AppDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
  onClose?: () => void;
}

export default function AppDialog({
  isOpen,
  title,
  message,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-sm mx-4 rounded-2xl border border-slate-200 px-6 py-8 shadow-2xl bg-white">
        {/* Title */}
        <h2 className="text-center text-lg font-bold mb-2 text-slate-900">
          {title}
        </h2>

        {/* Message */}
        <p className="text-center text-sm mb-6 text-slate-700">
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
              className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-300 font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
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
            className="flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-colors hover:brightness-95"
            style={APP_STYLES.primaryButton}
          >
            {primaryButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
