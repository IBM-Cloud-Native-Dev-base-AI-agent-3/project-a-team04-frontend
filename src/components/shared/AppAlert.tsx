interface AppAlertProps {
  tone: 'success' | 'error' | 'info';
  message: string;
}

const toneStyles: Record<AppAlertProps['tone'], string> = {
  success: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  error: 'border-red-300 bg-red-50 text-red-800',
  info: 'border-blue-300 bg-blue-50 text-blue-800',
};

export default function AppAlert({ tone, message }: AppAlertProps) {
  return (
    <div className={`mb-4 rounded-lg border px-4 py-3 text-sm font-semibold ${toneStyles[tone]}`} role="alert">
      {message}
    </div>
  );
}
