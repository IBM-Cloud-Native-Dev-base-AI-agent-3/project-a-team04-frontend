import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostResult } from '@/post/postSlice';
import { postRegisterThunk, updatePostThunk, fetchPostDetailThunk } from '@/post/postThunk';
import PostCreateComponent from '@/post/PostCreateComponent';

interface PostCreateContainerProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
  currentUserId: number | null;
}

export default function PostCreateContainer({ isLoggedIn, onLogout, currentUserId }: PostCreateContainerProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const { loading, error, result, currentPostDetail } = useSelector((state: any) => state.post);

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchPostDetailThunk(Number(id)));
    }
  }, [isEditMode, id, dispatch]);

  useEffect(() => {
    if (result === 1) {
      dispatch(clearPostResult());
      navigate(isEditMode ? `/post/${id}` : '/post');
    }
  }, [result, dispatch, navigate, isEditMode, id]);

  const handleSubmit = ({ title, content }: { title: string; content: string }) => {
    if (!currentUserId) {
      navigate('/login');
      return;
    }

    if (isEditMode && id) {
      dispatch(
        updatePostThunk({
          postId: Number(id),
          title,
          content,
        })
      );
    } else {
      dispatch(
        postRegisterThunk({
          title,
          content,
        })
      );
    }
  };

  return (
    <PostCreateComponent
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
      loading={loading}
      error={error}
      isEditMode={isEditMode}
      initialTitle={isEditMode && currentPostDetail ? currentPostDetail.title : ''}
      initialContent={isEditMode && currentPostDetail ? (currentPostDetail.content ?? currentPostDetail.body ?? '') : ''}
      onBack={() => navigate(isEditMode ? `/post/${id}` : '/post')}
      onSubmit={handleSubmit}
    />
  );
}
