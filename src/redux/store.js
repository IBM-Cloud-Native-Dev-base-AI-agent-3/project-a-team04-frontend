import { configureStore } from '@reduxjs/toolkit';
import postReducer from '@/post/postSlice';
import userReducer from '@/user/userSlice';
import authReducer from '@/auth/authSlice';
import forumReducer from '@/forum/forumSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    auth: authReducer,
    forum: forumReducer,
  },
});
