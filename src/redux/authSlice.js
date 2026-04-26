import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, refreshThunk } from '@/service/authThunk';

const initialState = {
  loginLoading: false,
  loginResult: 0,
  loginError: null,
  refreshLoading: false,
  refreshResult: 0,
  refreshError: null,
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
      });
  },
});

export const { clearLoginState, clearRefreshState } = authSlice.actions;
export default authSlice.reducer;
