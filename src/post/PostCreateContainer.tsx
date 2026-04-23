import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostResult } from '@/redux/postSlice';
import { postRegisterThunk } from '@/service/postThunk';
import PostCreateComponent from '@/post/PostCreateComponent';

interface PostCreateContainerProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
  currentUserId: number | null;
}

export default function PostCreateContainer({ isLoggedIn, onLogout, currentUserId }: PostCreateContainerProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { loading, error, result } = useSelector((state: any) => state.post);

  useEffect(() => {
    if (result === 1) {
      dispatch(clearPostResult());
      navigate('/post');
    }
  }, [result, dispatch, navigate]);

  const handleSubmit = ({ title, content }: { title: string; content: string }) => {
    if (!currentUserId) {
      navigate('/login');
      return;
    }

    dispatch(
      postRegisterThunk({
        userId: currentUserId,
        title,
        content,
      })
    );
  };

  return (
    <PostCreateComponent
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
      loading={loading}
      error={error}
      onBack={() => navigate('/post')}
      onSubmit={handleSubmit}
    />
  );
}
