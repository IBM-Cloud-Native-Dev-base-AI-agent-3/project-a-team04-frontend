import { createSlice } from '@reduxjs/toolkit';
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  requestPasswordResetThunk,
  confirmPasswordResetThunk,
} from '@/auth/authThunk';

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
  passwordResetRequestLoading: false,
  passwordResetRequestResult: 0,
  passwordResetRequestError: null,
  passwordResetConfirmLoading: false,
  passwordResetConfirmResult: 0,
  passwordResetConfirmError: null,
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
    clearPasswordResetRequestState(state) {
      state.passwordResetRequestResult = 0;
      state.passwordResetRequestError = null;
    },
    clearPasswordResetConfirmState(state) {
      state.passwordResetConfirmResult = 0;
      state.passwordResetConfirmError = null;
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
      })
      .addCase(requestPasswordResetThunk.pending, (state) => {
        state.passwordResetRequestLoading = true;
        state.passwordResetRequestResult = 0;
        state.passwordResetRequestError = null;
      })
      .addCase(requestPasswordResetThunk.fulfilled, (state) => {
        state.passwordResetRequestLoading = false;
        state.passwordResetRequestResult = 1;
      })
      .addCase(requestPasswordResetThunk.rejected, (state, action) => {
        state.passwordResetRequestLoading = false;
        state.passwordResetRequestResult = 0;
        state.passwordResetRequestError = action.payload || action.error.message || 'Failed to request password reset';
      })
      .addCase(confirmPasswordResetThunk.pending, (state) => {
        state.passwordResetConfirmLoading = true;
        state.passwordResetConfirmResult = 0;
        state.passwordResetConfirmError = null;
      })
      .addCase(confirmPasswordResetThunk.fulfilled, (state) => {
        state.passwordResetConfirmLoading = false;
        state.passwordResetConfirmResult = 1;
      })
      .addCase(confirmPasswordResetThunk.rejected, (state, action) => {
        state.passwordResetConfirmLoading = false;
        state.passwordResetConfirmResult = 0;
        state.passwordResetConfirmError = action.payload || action.error.message || 'Failed to confirm password reset';
      });
  },
});

export const {
  clearLoginState,
  clearRefreshState,
  clearLogoutState,
  clearPasswordResetRequestState,
  clearPasswordResetConfirmState,
} = authSlice.actions;
export default authSlice.reducer;
