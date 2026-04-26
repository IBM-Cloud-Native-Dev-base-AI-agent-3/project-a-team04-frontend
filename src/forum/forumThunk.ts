import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getForums,
  getForumDetail,
  applyForum,
  getMyRegistration,
  type ForumListResponse,
  type ForumDetailResponse,
  type ApplyRequest,
} from './forumService';

export const fetchForumsThunk = createAsyncThunk<ForumListResponse[], string | undefined, { rejectValue: string }>(
  'forum/fetchList',
  async (locale, { rejectWithValue }) => {
    try {
      return await getForums(locale);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch forums');
    }
  }
);

export const fetchForumDetailThunk = createAsyncThunk<
  ForumDetailResponse,
  { forumId: number; locale?: string },
  { rejectValue: string }
>(
  'forum/fetchDetail',
  async ({ forumId, locale }, { rejectWithValue }) => {
    try {
      return await getForumDetail(forumId, locale);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch forum detail');
    }
  }
);

export const applyForumThunk = createAsyncThunk<any, { forumId: number; request: ApplyRequest }, { rejectValue: string }>(
  'forum/apply',
  async ({ forumId, request }, { rejectWithValue }) => {
    try {
      return await applyForum(forumId, request);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to apply forum');
    }
  }
);

export const fetchMyRegistrationThunk = createAsyncThunk<any, number, { rejectValue: string }>(
  'forum/fetchMyRegistration',
  async (forumId, { rejectWithValue }) => {
    try {
      return await getMyRegistration(forumId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch my registration');
    }
  }
);
