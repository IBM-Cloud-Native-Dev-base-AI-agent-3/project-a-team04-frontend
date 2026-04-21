import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <Button 
      variant="outline" 
      className="mb-8 font-bold"
      onClick={onClick}
    >
      <ArrowLeft size={16} className="mr-2" /> 목록으로
    </Button>
  );
}
