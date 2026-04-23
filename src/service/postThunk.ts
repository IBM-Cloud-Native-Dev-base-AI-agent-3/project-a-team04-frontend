import { createAsyncThunk } from '@reduxjs/toolkit';
import { service_path } from './service_ip_port';

interface ApiPost {
  userId?: number;
  id: number;
  title: string;
  body?: string;
  content?: string;
  views?: number;
  date?: string;
}

interface PostRegisterParams {
  userId: number;
  title: string;
  content: string;
}

export const fetchPostsThunk = createAsyncThunk<ApiPost[], void, { rejectValue: string }>(
  'post/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${service_path}/posts`);

      if (!response.ok) {
        throw new Error(`GET /posts failed: ${response.status}`);
      }

      return (await response.json()) as ApiPost[];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch posts');
    }
  }
);

export const postRegisterThunk = createAsyncThunk<ApiPost, PostRegisterParams, { rejectValue: string }>(
  'post/register',
  async ({ userId, title, content }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${service_path}/posts?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, title, body: content, content }),
      });

      if (!response.ok) {
        throw new Error(`POST /posts failed: ${response.status}`);
      }

      return (await response.json()) as ApiPost;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to register post');
    }
  }
);
