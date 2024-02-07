import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (user, action) => {
        return action.payload;
    }
  }
})

export const { setUser } = userSlice.actions;

export const selectUser = state => state.user;

export default userSlice.reducer;