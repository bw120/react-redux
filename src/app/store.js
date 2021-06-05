import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/users';
import postsReducer from '../reducers/posts';

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postsReducer,
  },
});
