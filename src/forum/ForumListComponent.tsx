import { useTranslation } from 'react-i18next';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/shared/PageHeader';
import Pagination from '@/components/shared/Pagination';
import ForumCard from '@/components/forum/ForumCard';
import { APP_THEME } from '@/constants/theme';

interface ForumListComponentProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
  forums: any[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageClick: (page: number) => void;
  onForumClick: (id: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export default function ForumListComponent({
  isLoggedIn,
  onLogout,
  forums,
  loading,
  error,
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageClick,
  onForumClick,
  onPrevClick,
  onNextClick,
}: ForumListComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <PageHeader title={t('forum.forumGuide')} description={t('forum.forumGuideDescription')} />

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {forums.map((forum) => (
                <div key={forum.id}>
                  <ForumCard {...forum} onClick={() => onForumClick(forum.id)} />
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
              onPageClick={onPageClick}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
