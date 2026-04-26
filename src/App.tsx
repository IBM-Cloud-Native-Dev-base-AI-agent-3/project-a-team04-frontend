import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '@/i18n/config';
import LoginContainer from '@/auth/LoginContainer';
import SignupContainer from '@/user/SignupContainer';
import ProfileContainer from '@/user/ProfileContainer';
import ForumListContainer from '@/forum/ForumListContainer';
import ForumDetailContainer from '@/forum/ForumDetailContainer';
import HomeContainer from '@/home/HomeContainer';
import PasswordResetContainer from '@/auth/PasswordResetContainer';
import { fetchMyProfileThunk } from '@/user/userThunk';
import { getAccessToken } from '@/auth/authService';

interface User {
  id: number;
  email: string;
  nickname: string;
}
import PostListContainer from '@/post/PostListContainer';
import PostDetailContainer from '@/post/PostDetailContainer';
import PostCreateContainer from '@/post/PostCreateContainer';
import { logoutThunk } from '@/auth/authThunk';

function App() {
  const dispatch = useDispatch<any>();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const isLoggedIn = currentUser !== null;
  const { profile } = useSelector((state: any) => state.user);

  // Re-hydrate user state on refresh
  useEffect(() => {
    const token = getAccessToken();
    if (token && !profile) {
      dispatch(fetchMyProfileThunk());
    }
  }, [dispatch, profile]);

  // Sync profile from Redux to App's local currentUser state
  useEffect(() => {
    if (profile) {
      setCurrentUser({
        id: profile.id,
        email: profile.email,
        nickname: profile.nickname,
      });
    } else {
      setCurrentUser(null);
    }
  }, [profile]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    setCurrentUser(null);
  };

  return (
    <Routes>
      {/* Home & Authentication Routes */}
      <Route path="/" element={<HomeContainer isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
      <Route path="/login" element={<LoginContainer onLogin={handleLogin} />} />
      <Route path="/signup" element={<SignupContainer />} />
      <Route path="/password-reset" element={<PasswordResetContainer />} />
      <Route path="/profile" element={<ProfileContainer isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />

      {/* Forum Routes */}
      <Route path="/forum-list" element={<ForumListContainer isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
      <Route path="/forum/:id" element={<ForumDetailContainer isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />

      {/* Post Routes */}
      <Route path="/post" element={<PostListContainer isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
      <Route path="/post/:id" element={<PostDetailContainer isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUserId={currentUser?.id ?? null} />} />
      <Route
        path="/post/create"
        element={<PostCreateContainer isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUserId={currentUser?.id ?? null} />}
      />
      <Route
        path="/post/:id/edit"
        element={<PostCreateContainer isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUserId={currentUser?.id ?? null} />}
      />

      {/* Backward-compatible legacy freeboard routes */}
      <Route path="/free-board" element={<Navigate to="/post" replace />} />
      <Route path="/free-board/create" element={<Navigate to="/post/create" replace />} />
      <Route path="/free-board/:id" element={<PostDetailContainer isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUserId={currentUser?.id ?? null} />} />
      <Route path="/freeboard" element={<Navigate to="/post" replace />} />
      <Route path="/freeboard/create" element={<Navigate to="/post/create" replace />} />
      <Route path="/freeboard/:id" element={<PostDetailContainer isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUserId={currentUser?.id ?? null} />} />
    </Routes>
  );
}

export default App;
