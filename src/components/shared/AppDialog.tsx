import { useEffect, useRef } from 'react';

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
  const shownDialogKeyRef = useRef('');

  useEffect(() => {
    if (!isOpen) {
      shownDialogKeyRef.current = '';
      return;
    }

    const shouldHideTitle = title === '알림';
    const text = shouldHideTitle || !title ? message : `${title}\n\n${message}`;
    const dialogType = secondaryButtonLabel ? 'confirm' : 'alert';
    const dialogKey = `${dialogType}:${text}`;

    if (shownDialogKeyRef.current === dialogKey) {
      return;
    }
    shownDialogKeyRef.current = dialogKey;

    if (secondaryButtonLabel) {
      const confirmed = window.confirm(text);
      if (confirmed) {
        onPrimaryClick();
      } else {
        onSecondaryClick?.();
      }
      onClose?.();
      return;
    }

    window.alert(text);
    onPrimaryClick();
    onClose?.();
  }, [isOpen, title, message, secondaryButtonLabel, primaryButtonLabel, onPrimaryClick, onSecondaryClick, onClose]);

  return null;
}
