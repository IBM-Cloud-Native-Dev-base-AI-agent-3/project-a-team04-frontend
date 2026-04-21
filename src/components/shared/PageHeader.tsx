import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { APP_STYLES } from '@/constants/theme';

interface PageHeaderProps {
  title: string;
  description: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export default function PageHeader({ title, description, actionButton }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-end mb-6">
      <div>
        <h1 className="text-4xl font-black text-slate-900">{title}</h1>
        <p className="text-slate-500 mt-2">{description}</p>
      </div>
      {actionButton && (
        <Button 
          style={APP_STYLES.primaryButton}
          className="text-white font-bold hover:brightness-95"
          onClick={actionButton.onClick}
        >
          {actionButton.label}
        </Button>
      )}
    </div>
  );
}
