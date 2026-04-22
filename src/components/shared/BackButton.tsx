import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  const { t } = useTranslation();

  return (
    <Button 
      variant="outline" 
      className="mb-8 font-bold"
      onClick={onClick}
    >
      <ArrowLeft size={16} className="mr-2" /> {t('common.list')}
    </Button>
  );
}
