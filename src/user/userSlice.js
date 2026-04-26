import { createSlice } from '@reduxjs/toolkit';
import { fetchMyProfileThunk, signupThunk } from '@/user/userThunk';

const initialState = {
  profile: null,
  profileLoading: false,
  profileError: null,
  signupResult: 0,
  signupLoading: false,
  signupError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearSignupState(state) {
      state.signupResult = 0;
      state.signupError = null;
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
      });
  },
});

export const { clearSignupState } = userSlice.actions;
export default userSlice.reducer;
