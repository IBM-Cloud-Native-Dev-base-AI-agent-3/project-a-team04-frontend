import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import PasswordResetPage from '@/pages/PasswordResetPage';
import ProfilePage from '@/pages/ProfilePage';
import ForumGuidePage from '@/pages/ForumGuidePage';
import ForumDetailPage from '@/pages/ForumDetailPage';
import ForumCreatePage from '@/pages/ForumCreatePage';
import FreeBoardPage from '@/pages/FreeBoardPage';
import FreeBoardDetailPage from '@/pages/FreeBoardDetailPage';
import FreeBoardCreatePage from '@/pages/FreeBoardCreatePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      {/* Home & Authentication Routes */}
      <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/password-reset" element={<PasswordResetPage />} />
      <Route path="/profile" element={<ProfilePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />

      {/* Forum Routes */}
      <Route path="/forum-guide" element={<ForumGuidePage isLoggedIn={isLoggedIn} />} />
      <Route path="/forum/:id" element={<ForumDetailPage isLoggedIn={isLoggedIn} />} />
      <Route path="/forum/create" element={<ForumCreatePage isLoggedIn={isLoggedIn} />} />

      {/* Free Board Routes */}
      <Route path="/freeboard" element={<FreeBoardPage isLoggedIn={isLoggedIn} />} />
      <Route path="/freeboard/:id" element={<FreeBoardDetailPage isLoggedIn={isLoggedIn} />} />
      <Route path="/freeboard/create" element={<FreeBoardCreatePage isLoggedIn={isLoggedIn} />} />
    </Routes>
  );
}

export default App;
