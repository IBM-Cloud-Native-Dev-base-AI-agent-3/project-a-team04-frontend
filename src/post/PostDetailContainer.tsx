import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetailThunk, deletePostThunk } from '@/service/postThunk';
import { clearPostResult } from '@/redux/postSlice';
import PostDetailComponent from '@/post/PostDetailComponent';

interface PostDetailContainerProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
  currentUserId: number | null;
}

export default function PostDetailContainer({ isLoggedIn, onLogout, currentUserId }: PostDetailContainerProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const { currentPostDetail, detailLoading, detailError, loading, result } = useSelector((state: any) => state.post);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostDetailThunk(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (result === 1) {
      dispatch(clearPostResult());
      navigate('/post');
    }
  }, [result, dispatch, navigate]);

  const handleDelete = (postId: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      if (!currentUserId) return;
      dispatch(deletePostThunk({ postId, userId: currentUserId }));
    }
  };

  const handleEdit = (postId: number) => {
    navigate(`/post/${postId}/edit`);
  };

  return (
    <PostDetailComponent
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
      post={currentPostDetail}
      currentUserId={currentUserId}
      loading={loading || detailLoading}
      detailError={detailError}
      onBack={() => navigate('/post')}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
