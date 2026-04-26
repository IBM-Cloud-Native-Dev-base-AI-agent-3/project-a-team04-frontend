import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '@/i18n/config';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import PasswordResetPage from '@/pages/PasswordResetPage';
import ProfilePage from '@/pages/ProfilePage';
import ForumGuidePage from '@/pages/ForumGuidePage';
import ForumDetailPage from '@/pages/ForumDetailPage';
import ForumCreatePage from '@/pages/ForumCreatePage';

interface User {
  id: number;
  email: string;
  name: string;
}
import PostListContainer from '@/post/PostListContainer';
import PostDetailContainer from '@/post/PostDetailContainer';
import PostCreateContainer from '@/post/PostCreateContainer';
import { logoutThunk } from '@/service/authThunk';

function App() {
  const dispatch = useDispatch<any>();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const isLoggedIn = currentUser !== null;

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
      <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/password-reset" element={<PasswordResetPage />} />
      <Route path="/profile" element={<ProfilePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />

      {/* Forum Routes */}
      <Route path="/forum-guide" element={<ForumGuidePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
      <Route path="/forum/:id" element={<ForumDetailPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
      <Route path="/forum/create" element={<ForumCreatePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />

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
