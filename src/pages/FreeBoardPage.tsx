import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/shared/PageHeader';
import Pagination from '@/components/shared/Pagination';
import PostTable from '@/components/freeboard/PostTable';
import { FREE_POSTS } from '@/data/freePosts';
import { APP_THEME } from '@/constants/theme';

interface FreeBoardPageProps {
  isLoggedIn: boolean;
}

export default function FreeBoardPage({ isLoggedIn }: FreeBoardPageProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(FREE_POSTS.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePosts = FREE_POSTS.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-4xl mx-auto">
          <PageHeader 
            title="자유게시판"
            description="자유롭게 의견을 나누는 공간입니다."
            actionButton={{
              label: '글쓰기',
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
