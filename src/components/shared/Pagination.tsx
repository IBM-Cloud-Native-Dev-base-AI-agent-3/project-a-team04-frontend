import { Button } from '@/components/ui/button';
import { APP_STYLES } from '@/constants/theme';

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
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <p className="text-sm text-slate-500 text-center">
        총 {totalItems}개 중 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)}개 표시
      </p>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button
          variant="outline"
          className="h-9 px-3 bg-white"
          disabled={currentPage === 1}
          onClick={onPrevClick}
        >
          이전
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
          다음
        </Button>
      </div>
    </div>
  );
}
