import { createSlice } from '@reduxjs/toolkit';
import { fetchMyProfileThunk, signupThunk, updateProfileThunk, withdrawThunk } from '@/user/userThunk';

const initialState = {
  profile: null,
  profileLoading: false,
  profileError: null,
  signupResult: 0,
  signupLoading: false,
  signupError: null,
  withdrawLoading: false,
  withdrawResult: 0,
  withdrawError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearSignupState(state) {
      state.signupResult = 0;
      state.signupError = null;
    },
    clearWithdrawState(state) {
      state.withdrawResult = 0;
      state.withdrawError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.signupLoading = true;
        state.signupError = null;
        state.signupResult = 0;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.signupResult = 1;
        state.profile = action.payload;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupResult = 0;
        state.signupError = action.payload || action.error.message || 'Failed to sign up';
      })
      .addCase(fetchMyProfileThunk.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchMyProfileThunk.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchMyProfileThunk.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload || action.error.message || 'Failed to fetch my profile';
      })
      .addCase(updateProfileThunk.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload || action.error.message || 'Failed to update profile';
      })
      .addCase(withdrawThunk.pending, (state) => {
        state.withdrawLoading = true;
        state.withdrawError = null;
        state.withdrawResult = 0;
      })
      .addCase(withdrawThunk.fulfilled, (state) => {
        state.withdrawLoading = false;
        state.withdrawResult = 1;
        state.profile = null;
      })
      .addCase(withdrawThunk.rejected, (state, action) => {
        state.withdrawLoading = false;
        state.withdrawResult = -1;
        state.withdrawError = action.payload || action.error.message || 'Failed to withdraw';
      });
  },
});

export const { clearSignupState, clearWithdrawState } = userSlice.actions;
export default userSlice.reducer;
