import { createAsyncThunk } from '@reduxjs/toolkit';
import { signup, type ProfileResponse, type SignupRequest } from './userService';

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
