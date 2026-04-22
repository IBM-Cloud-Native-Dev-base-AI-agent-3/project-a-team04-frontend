import { Button } from '@/components/ui/button';
import { APP_STYLES } from '@/constants/theme';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  onPageClick: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPrevClick,
  onNextClick,
  onPageClick,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  const { t } = useTranslation();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <p className="text-sm text-slate-500 text-center">
        {t('pagination.summary', {
          total: totalItems,
          start: startIndex + 1,
          end: endIndex,
        })}
      </p>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button
          variant="outline"
          className="h-9 px-3 bg-white"
          disabled={currentPage === 1}
          onClick={onPrevClick}
        >
          {t('common.back')}
        </Button>

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              className={`h-9 w-9 p-0 ${currentPage === page ? 'text-white' : 'bg-white'}`}
              style={currentPage === page ? APP_STYLES.primaryButton : undefined}
              onClick={() => onPageClick(page)}
            >
              {page}
            </Button>
          );
        })}

        <Button
          variant="outline"
          className="h-9 px-3 bg-white"
          disabled={currentPage === totalPages}
          onClick={onNextClick}
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
}
