import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsThunk } from '@/service/postThunk';
import PostDetailComponent from '@/post/PostDetailComponent';

interface PostDetailContainerProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export default function PostDetailContainer({ isLoggedIn, onLogout }: PostDetailContainerProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const { posts } = useSelector((state: any) => state.post);

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPostsThunk());
    }
  }, [dispatch, posts.length]);

  const postId = Number(id);
  const post = posts.find((item: any) => item.id === postId) ?? null;

  return <PostDetailComponent isLoggedIn={isLoggedIn} onLogout={onLogout} post={post} onBack={() => navigate('/post')} />;
}
