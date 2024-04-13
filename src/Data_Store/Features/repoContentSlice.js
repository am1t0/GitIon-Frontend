import {createSlice,createAsyncThunk} from  '@reduxjs/toolkit'

export const fetchRepoContent  = createAsyncThunk('fetchRepoContent', async (Project) => {
    const {repo: {owner,repoName}} = Project;
    // console.log(Project);
    // console.log('fetchingRepoContent....')

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents?ref=main`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('leaderToken')}`
          },
        });

        if (!response.ok) {
          return Promise.reject(response); 
        }
       const res = await response.json();
       
       return res;
        
      } catch (error) {
        return  error.message || "An error occurred while loading";
      }
})

const repoContentSlice = createSlice({
    name : 'repo',
    initialState:{
        isLoading: true,
        data : null,
        isError: false,
    },
    extraReducers: (builder)=>{

        //------------HANDLING API Call to fetchProjects-------------//
        builder.addCase(fetchRepoContent.pending, (state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchRepoContent.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        }) 
        builder.addCase(fetchRepoContent.rejected, (state,action)=>{
            console.log("Error : "+action.payload);
            state.isError = true;
        })
        
    },
    reducers:{

    }
})

export default  repoContentSlice.reducer;
