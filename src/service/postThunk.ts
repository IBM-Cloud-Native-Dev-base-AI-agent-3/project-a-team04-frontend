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

interface PostUpdateParams {
  postId: number;
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
        body: JSON.stringify({ userId, title, body: content }),
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

export const fetchPostDetailThunk = createAsyncThunk<ApiPost, number, { rejectValue: string }>(
  'post/fetchDetail',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${service_path}/posts/${postId}`);

      if (!response.ok) {
        throw new Error(`GET /posts/${postId} failed: ${response.status}`);
      }

      return (await response.json()) as ApiPost;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch post detail');
    }
  }
);

export const updatePostThunk = createAsyncThunk<ApiPost, PostUpdateParams, { rejectValue: string }>(
  'post/update',
  async ({ postId, userId, title, content }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${service_path}/posts/${postId}?userId=${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error(`PATCH /posts/${postId} failed: ${response.status}`);
      }

      return (await response.json()) as ApiPost;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update post');
    }
  }
);

interface PostDeleteParams {
  postId: number;
  userId: number;
}

export const deletePostThunk = createAsyncThunk<number, PostDeleteParams, { rejectValue: string }>(
  'post/delete',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${service_path}/posts/${postId}?userId=${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DELETE /posts/${postId} failed: ${response.status} ${errorText}`);
      }

      // DELETE 응답이 빈 경우 처리
      try {
        await response.json();
      } catch {
        // JSON 파싱 실패해도 괜찮음
      }

      return postId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete post');
    }
  }
);
