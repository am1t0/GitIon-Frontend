import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import getAccessToken from '../../Utils/auth';


export const fetchMemberDetails  = createAsyncThunk('fetchMemberDetails', async (teamId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/teams/members/${teamId}`, {
          method: 'GET',  
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
          },
        });

        if (!response.ok) {
          return  Promise.reject(response);
        }
       const res = await response.json();

       return res.data;
        
      } catch (error) {
        return  error.message || "An error occurred while loading";
      }
})

const memberSlice = createSlice({
    name: 'member',
    initialState: {
         isLoading: true,
         members : null,
         isError: false,
    },
    extraReducers:(builder)=>{

        //------------HANDLING API Call to fetchMemberDetails-------------//
        builder.addCase(fetchMemberDetails.pending, (state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchMemberDetails.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.members = action.payload;
        }) 
        builder.addCase(fetchMemberDetails.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
        })
        
    }
    
    ,reducers: {
       
    },
});

export default memberSlice.reducer;
