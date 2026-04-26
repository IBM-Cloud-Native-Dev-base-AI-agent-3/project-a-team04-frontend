import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsThunk } from '@/post/postThunk';
import PostListComponent from '@/post/PostListComponent';

interface PostListContainerProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export default function PostListContainer({ isLoggedIn, onLogout }: PostListContainerProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { posts, loading, error } = useSelector((state: any) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(fetchPostsThunk());
  }, [dispatch]);

  const mappedPosts = posts.map((post: any) => ({
    id: post.id,
    title: post.title,
    author: `user-${post.userId ?? 'unknown'}`,
    views: post.views ?? 0,
    date: post.date ?? '-',
  }));

  const totalPages = Math.max(1, Math.ceil(mappedPosts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePosts = mappedPosts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <PostListComponent
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
      posts={visiblePosts}
      loading={loading}
      error={error}
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      totalItems={mappedPosts.length}
      onWrite={() => navigate(isLoggedIn ? '/post/create' : '/login')}
      onRowClick={(id) => navigate(`/post/${id}`)}
      onPrevClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
      onNextClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
      onPageClick={setCurrentPage}
    />
  );
}
