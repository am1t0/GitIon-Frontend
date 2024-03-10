import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     repo: {}
  };
  
  const RepoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
      setRepo: (state, action) => {
        state.repo = action.payload;
        console.log('The repo recieved here is ', state.repo);
      }
    },
  });
  
  export const { setRepo } = RepoSlice.actions;
  export default RepoSlice.reducer;
  