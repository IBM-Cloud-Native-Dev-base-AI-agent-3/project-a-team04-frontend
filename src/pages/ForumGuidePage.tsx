import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/shared/PageHeader';
import Pagination from '@/components/shared/Pagination';
import ForumCard from '@/components/forum/ForumCard';
import { FORUMS } from '@/data/forums';
import { APP_THEME } from '@/constants/theme';

interface ForumGuidePageProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export default function ForumGuidePage({ isLoggedIn, onLogout }: ForumGuidePageProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(FORUMS.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleForums = FORUMS.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <PageHeader
          title="포럼안내"
          description="포럼을 카드 또는 그리드 형식으로 확인할 수 있습니다."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {visibleForums.map((forum) => (
            <div key={forum.id}>
              <ForumCard
                {...forum}
                onClick={() => navigate(`/forum/${forum.id}`)}
              />
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          onNextClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          onPageClick={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={FORUMS.length}
        />
      </main>
      <Footer />
    </div>
  );
}
