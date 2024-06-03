import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getAccessToken from '../../Utils/auth';

export const fetchTeam  = createAsyncThunk('fetchTeam', async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/teams/teams-for-user`,
        {
          method:'GET',
          headers:{
            "Authorization":`Bearer ${getAccessToken()}`
          }
        })

        if (!response.ok) {
         return  Promise.reject(response.statusText);
       }
       const data = await response.json();
      //  console.log('all data is , ',data);
       return data;

   } catch (error) {
      console.error('Error fetching user data:', error.message);
   }
})

export const addTeam = createAsyncThunk('addTeam', async ({name,description}) =>{
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/teams/create-team`, {
           method:'POST',
           headers: {
              'Content-Type': 'application/json',
               'Authorization':`Bearer ${getAccessToken()}`
            },
            body: JSON.stringify({
              name,
              description
            }),
        });
        if (!response.ok) {
          return Promise.reject(response.statusText);
        }
        const newTeam = await response.json();
       
        return newTeam;
         
      } catch (error) {
        console.error('Error creating todo:', error.message);
        
      }
})

const teamSlice = createSlice({
    name : 'team',
    initialState:{
        isLoading: true,
        data : null,
        isError: false,
        newTeamStatus: {
              adding: false,
              error:false
        }
    },
    extraReducers: (builder)=>{

        //------------HANDLING API Call to fetchProjects-------------//
        builder.addCase(fetchTeam.pending, (state,action)=>{
            // console.log('pending...')
            state.isLoading = true;
        })
        builder.addCase(fetchTeam.fulfilled, (state,action)=>{
          // console.log('fulfilled')
            state.isLoading = false;
            state.data = action.payload;
        }) 
        builder.addCase(fetchTeam.rejected, (state,action)=>{
          // console.log('rejected')
            state.isError = true;
        })

        //-----------HANDLING Call to create Team-------------------//
        builder.addCase(addTeam.pending, (state,action)=>{
            state.newTeamStatus.adding = true;
        })
        builder.addCase(addTeam.fulfilled, (state,action)=>{
            state.newTeamStatus.adding = false;
            state.data.data = [action.payload,...state.data.data];
        }) 
        builder.addCase(addTeam.rejected, (state,action)=>{
            state.newTeamStatus.error = true;
        })
        
    },
    reducers:{

    }
})

export default  teamSlice.reducer;