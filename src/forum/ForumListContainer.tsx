import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForumsThunk } from './forumThunk';
import ForumListComponent from './ForumListComponent';

interface ForumListContainerProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export default function ForumListContainer({ isLoggedIn, onLogout }: ForumListContainerProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { forums, loading, error } = useSelector((state: any) => state.forum);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(fetchForumsThunk(undefined));
  }, [dispatch]);

  const totalPages = Math.ceil(forums.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleForums = forums.slice(startIndex, startIndex + itemsPerPage);

  return (
    <ForumListComponent
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
      forums={visibleForums}
      loading={loading}
      error={error}
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      totalItems={forums.length}
      onPageClick={setCurrentPage}
      onForumClick={(id) => navigate(`/forum/${id}`)}
      onPrevClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
      onNextClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
    />
  );
}
