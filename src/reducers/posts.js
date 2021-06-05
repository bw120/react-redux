import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getPosts} from '../utils/api';

const initialState = {
  postList: {},
  status: 'idle',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({userId}) => {
    const response = await getPosts({userId});
    return response;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        const {userId} = action.meta.arg;
        state.postList[userId] = action.payload;
      });
  },
});

export const { } = postsSlice.actions;

export const postsData = (state) => state.posts;

export default postsSlice.reducer;