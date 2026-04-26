import { createSlice } from '@reduxjs/toolkit';
import { loginThunk } from '@/service/authThunk';

const initialState = {
  loginLoading: false,
  loginResult: 0,
  loginError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearLoginState(state) {
      state.loginResult = 0;
      state.loginError = null;
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
      });
  },
});

export const { clearLoginState } = authSlice.actions;
export default authSlice.reducer;
