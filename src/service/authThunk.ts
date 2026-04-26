import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, refresh, saveTokens, type TokenResponse } from './authService';

interface LoginRequest {
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk<TokenResponse, LoginRequest, { rejectValue: string }>(
  'auth/login',
  async (request, { rejectWithValue }) => {
    try {
      const tokens = await login(request);
      saveTokens(tokens);
      return tokens;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to login');
    }
  }
);

export const refreshThunk = createAsyncThunk<TokenResponse, void, { rejectValue: string }>(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      return await refresh();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to refresh token');
    }
  }
);

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to logout');
    }
  }
);
