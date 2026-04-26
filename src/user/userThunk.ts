import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMyProfile, signup, updateProfile, type ProfileResponse, type SignupRequest, type UpdateProfileRequest } from './userService';

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

export const updateProfileThunk = createAsyncThunk<ProfileResponse, UpdateProfileRequest, { rejectValue: string }>(
  'user/updateProfile',
  async (request, { rejectWithValue }) => {
    try {
      return await updateProfile(request);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update profile');
    }
  }
);
