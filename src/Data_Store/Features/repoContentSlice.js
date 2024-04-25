import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('fetchData', async ({project,selectedBranch},thunkAPI) => {
    const { repo: {owner, repoName} } = project;
    let branch = selectedBranch;
    if(!selectedBranch) branch = 'main';
    console.log('branch selected is ');
    console.log(branch);
    try {
        const [contentResponse, branchesResponse] = await Promise.all([
            fetch(`https://api.github.com/repos/${owner}/${repoName}/contents?ref=${branch}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('leaderToken')}`
                },
            }),
            fetch(`https://api.github.com/repos/${owner}/${repoName}/branches`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('leaderToken')}`
                },
            })
        ]);

        if (!contentResponse.ok || !branchesResponse.ok) {
            return thunkAPI.rejectWithValue({ contentResponse, branchesResponse });
        }

        const contentData = await contentResponse.json();
        const branchesData = await branchesResponse.json();

        return { repoContent: contentData, branches: branchesData };

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "An error occurred while loading");
    }
})

const repoContentSlice = createSlice({
    name: 'repo',
    initialState: {
        isLoading: true,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.isLoading = true;
            state.isError = true;
        })
    },
})
export default repoContentSlice.reducer;
