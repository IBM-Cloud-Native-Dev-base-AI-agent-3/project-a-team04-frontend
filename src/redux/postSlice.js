import { createSlice } from '@reduxjs/toolkit';
import { fetchPostsThunk, postRegisterThunk } from '@/service/postThunk';

const initialState = {
  posts: [],
  result: 0,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPostResult(state) {
      state.result = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || 'Failed to fetch posts';
      })
      .addCase(postRegisterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRegisterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.result = 1;
        if (action.payload) {
          state.posts = [action.payload, ...state.posts];
        }
      })
      .addCase(postRegisterThunk.rejected, (state, action) => {
        state.loading = false;
        state.result = 0;
        state.error = action.payload || action.error.message || 'Failed to register post';
      });
  },
});

export const { clearPostResult } = postSlice.actions;
export default postSlice.reducer;
