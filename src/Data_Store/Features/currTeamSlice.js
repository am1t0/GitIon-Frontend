import { createSlice } from '@reduxjs/toolkit';

const currTeamSlice = createSlice({
    name: 'currTeam',
    initialState: null,
    reducers: {
        setTeam: (state, action) => {
              return action.payload;
        },
    },
});

export const { setTeam } = currTeamSlice.actions;
export default currTeamSlice.reducer;
