import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false ,
  user: null,
};

const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    //   console.log("This is logging status ",state.isLoggedIn);
    },
    setUser: (state, action) => {
      state.user = action.payload;
       console.log("This is user Detail in redux ",state.user);
    },
  },
});

export const { setLoggedIn, setUser } = UsersSlice.actions;
export default UsersSlice.reducer;
