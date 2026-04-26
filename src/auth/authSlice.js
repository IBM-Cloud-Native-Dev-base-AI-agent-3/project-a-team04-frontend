import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, refreshThunk } from '@/auth/authThunk';

const initialState = {
  loginLoading: false,
  loginResult: 0,
  loginError: null,
  refreshLoading: false,
  refreshResult: 0,
  refreshError: null,
  logoutLoading: false,
  logoutResult: 0,
  logoutError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearLoginState(state) {
      state.loginResult = 0;
      state.loginError = null;
    },
    clearRefreshState(state) {
      state.refreshResult = 0;
      state.refreshError = null;
    },
    clearLogoutState(state) {
      state.logoutResult = 0;
      state.logoutError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loginLoading = true;
        state.loginResult = 0;
        state.loginError = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.loginLoading = false;
        state.loginResult = 1;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginResult = 0;
        state.loginError = action.payload || action.error.message || 'Failed to login';
      })
      .addCase(refreshThunk.pending, (state) => {
        state.refreshLoading = true;
        state.refreshResult = 0;
        state.refreshError = null;
      })
      .addCase(refreshThunk.fulfilled, (state) => {
        state.refreshLoading = false;
        state.refreshResult = 1;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.refreshLoading = false;
        state.refreshResult = 0;
        state.refreshError = action.payload || action.error.message || 'Failed to refresh token';
      })
      .addCase(logoutThunk.pending, (state) => {
        state.logoutLoading = true;
        state.logoutResult = 0;
        state.logoutError = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.logoutLoading = false;
        state.logoutResult = 1;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutResult = 0;
        state.logoutError = action.payload || action.error.message || 'Failed to logout';
      });
  },
});

export const { clearLoginState, clearRefreshState, clearLogoutState } = authSlice.actions;
export default authSlice.reducer;
