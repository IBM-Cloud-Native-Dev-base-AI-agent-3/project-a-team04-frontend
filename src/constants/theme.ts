export const APP_THEME = {
  colors: {
    primary: '#0054A6',
    secondary: '#F68B1E',
    logoBlue: '#00d1ff',
    danger: '#ef4444',
  },
  classes: {
    pageShellMuted: 'min-h-screen bg-slate-50 font-sans text-slate-900',
    pageShellPlain: 'min-h-screen bg-white font-sans text-slate-900',
    authFormTitle: 'text-3xl font-black mb-2',
    formInput: 'h-10 rounded',
  },
} as const;

export const APP_STYLES = {
  primaryButton: { backgroundColor: APP_THEME.colors.primary },
  secondaryButton: { backgroundColor: APP_THEME.colors.secondary },
  dangerButton: { backgroundColor: APP_THEME.colors.danger },
  logoAccent: { color: APP_THEME.colors.logoBlue },
} as const;
