import { createSlice } from '@reduxjs/toolkit';
import { fetchForumsThunk, fetchForumDetailThunk, applyForumThunk, fetchMyRegistrationThunk } from './forumThunk';

const initialState = {
  forums: [],
  currentForumDetail: null,
  myRegistration: null,
  loading: false,
  error: null,
  detailLoading: false,
  detailError: null,
  applyLoading: false,
  applyResult: 0, // 0: initial, 1: success, -1: fail
  applyError: null,
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    clearApplyResult(state) {
      state.applyResult = 0;
      state.applyError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // List
      .addCase(fetchForumsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForumsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.forums = action.payload;
      })
      .addCase(fetchForumsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch forums';
      })
      // Detail
      .addCase(fetchForumDetailThunk.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchForumDetailThunk.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentForumDetail = action.payload;
      })
      .addCase(fetchForumDetailThunk.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload || 'Failed to fetch forum detail';
      })
      // My Registration
      .addCase(fetchMyRegistrationThunk.fulfilled, (state, action) => {
        state.myRegistration = action.payload;
      })
      .addCase(fetchMyRegistrationThunk.rejected, (state) => {
        state.myRegistration = null; // No registration or error
      })
      // Apply
      .addCase(applyForumThunk.pending, (state) => {
        state.applyLoading = true;
        state.applyResult = 0;
        state.applyError = null;
      })
      .addCase(applyForumThunk.fulfilled, (state) => {
        state.applyLoading = false;
        state.applyResult = 1;
      })
      .addCase(applyForumThunk.rejected, (state, action) => {
        state.applyLoading = false;
        state.applyResult = -1;
        state.applyError = action.payload || 'Failed to apply';
      });
  },
});

export const { clearApplyResult } = forumSlice.actions;
export default forumSlice.reducer;
