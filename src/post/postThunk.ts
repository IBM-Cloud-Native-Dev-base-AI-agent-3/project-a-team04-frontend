import { createAsyncThunk } from '@reduxjs/toolkit';
import { service_path } from '@/service/service_ip_port';
import { getAccessToken } from '@/auth/authService';

interface ApiPost {
  id: number;
  userId: number;
  nickname?: string;
  title: string;
  content: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface PostRegisterParams {
  title: string;
  content: string;
}

interface PostUpdateParams {
  postId: number;
  title: string;
  content: string;
}

const getAuthHeaders = () => {
  const token = getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

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
  async ({ title, content }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${service_path}/posts`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title, content }),
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
      const response = await fetch(`${service_path}/posts/${postId}/view`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`GET /posts/${postId}/view failed: ${response.status}`);
      }

      return (await response.json()) as ApiPost;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch post detail');
    }
  }
);

export const updatePostThunk = createAsyncThunk<ApiPost, PostUpdateParams, { rejectValue: string }>(
  'post/update',
  async ({ postId, title, content }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${service_path}/posts/${postId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
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
}

export const deletePostThunk = createAsyncThunk<number, PostDeleteParams, { rejectValue: string }>(
  'post/delete',
  async ({ postId }, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await fetch(`${service_path}/posts/${postId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DELETE /posts/${postId} failed: ${response.status} ${errorText}`);
      }

      try {
        await response.json();
      } catch {
        // Ignore JSON parse error if response is empty
      }

      return postId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete post');
    }
  }
);
