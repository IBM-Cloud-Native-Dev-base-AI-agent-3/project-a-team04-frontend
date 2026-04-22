import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/shared/PageHeader';
import Pagination from '@/components/shared/Pagination';
import PostTable from '@/components/freeboard/PostTable';
import { FREE_POSTS } from '@/data/freePosts';
import { APP_THEME } from '@/constants/theme';

interface FreeBoardPageProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export default function FreeBoardPage({ isLoggedIn, onLogout }: FreeBoardPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(FREE_POSTS.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePosts = FREE_POSTS.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-4xl mx-auto">
          <PageHeader 
            title={t('freeBoard.freeBoard')}
            description={t('freeBoard.description')}
            actionButton={{
              label: t('freeBoard.write'),
              onClick: () => navigate('/free-board/create'),
            }}
          />

          <PostTable 
            posts={visiblePosts}
            onRowClick={(id) => navigate(`/free-board/${id}`)}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            onNextClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            onPageClick={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={FREE_POSTS.length}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
