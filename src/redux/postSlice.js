import { createSlice } from '@reduxjs/toolkit';
import { fetchPostsThunk, postRegisterThunk, fetchPostDetailThunk, updatePostThunk, deletePostThunk } from '@/service/postThunk';

const initialState = {
  posts: [],
  currentPostDetail: null,
  result: 0,
  loading: false,
  detailLoading: false,
  error: null,
  detailError: null,
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
      })
      .addCase(fetchPostDetailThunk.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchPostDetailThunk.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentPostDetail = action.payload;
      })
      .addCase(fetchPostDetailThunk.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload || action.error.message || 'Failed to fetch post detail';
      })
      .addCase(updatePostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = 0;
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.result = 1;
        state.currentPostDetail = action.payload;
        const postIndex = state.posts.findIndex((post) => post.id === action.payload.id);
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload;
        }
      })
      .addCase(updatePostThunk.rejected, (state, action) => {
        state.loading = false;
        state.result = 0;
        state.error = action.payload || action.error.message || 'Failed to update post';
      })
      .addCase(deletePostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = 0;
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.result = 1;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        if (state.currentPostDetail?.id === action.payload) {
          state.currentPostDetail = null;
        }
      })
      .addCase(deletePostThunk.rejected, (state, action) => {
        state.loading = false;
        state.result = 0;
        state.error = action.payload || action.error.message || 'Failed to delete post';
      });
  },
});

export const { clearPostResult } = postSlice.actions;
export default postSlice.reducer;
