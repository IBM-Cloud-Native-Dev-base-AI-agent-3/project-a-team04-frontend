import { useTranslation } from 'react-i18next';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/shared/PageHeader';
import Pagination from '@/components/shared/Pagination';
import PostTableComponent from '@/post/PostTableComponent';
import { APP_THEME } from '@/constants/theme';

interface PostListComponentProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
  posts: Array<{
    id: number;
    title: string;
    author: string;
    date: string;
    views: number;
  }>;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onWrite: () => void;
  onRowClick: (id: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  onPageClick: (page: number) => void;
}

export default function PostListComponent({
  isLoggedIn,
  onLogout,
  posts,
  loading,
  error,
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onWrite,
  onRowClick,
  onPrevClick,
  onNextClick,
  onPageClick,
}: PostListComponentProps) {
  const { t } = useTranslation();

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
              onClick: onWrite,
            }}
          />

          <PostTableComponent posts={posts} onRowClick={onRowClick} />

          {loading && <p className="mt-4 text-sm text-slate-500">{t('common.loading')}</p>}
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
            onPageClick={onPageClick}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
