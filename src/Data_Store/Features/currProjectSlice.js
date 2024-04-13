import { createSlice } from '@reduxjs/toolkit';

const currProjectSlice = createSlice({
    name: 'currTeam',
    initialState: null,
    reducers: {
        setProject: (state, action) => {
              return action.payload;
        },
    },
});

export const { setProject } = currProjectSlice.actions;
export default currProjectSlice.reducer;
