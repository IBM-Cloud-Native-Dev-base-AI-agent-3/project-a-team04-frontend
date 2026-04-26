import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMyProfile, signup, type ProfileResponse, type SignupRequest } from './userService';

export const signupThunk = createAsyncThunk<ProfileResponse, SignupRequest, { rejectValue: string }>(
  'user/signup',
  async (request, { rejectWithValue }) => {
    try {
      return await signup(request);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to sign up');
    }
  }
);

export const fetchMyProfileThunk = createAsyncThunk<ProfileResponse, void, { rejectValue: string }>(
  'user/fetchMyProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await getMyProfile();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch my profile');
    }
  }
);
