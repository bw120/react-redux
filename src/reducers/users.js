import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getUsers} from '../utils/api';

const initialState = {
  userList: [],
  status: 'idle',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await getUsers();
    return response;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userList = action.payload;
      });
  },
});

export const { } = usersSlice.actions;

export const userData = (state) => state.users;

export default usersSlice.reducer;