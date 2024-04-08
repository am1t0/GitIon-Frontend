import { configureStore} from '@reduxjs/toolkit'
import projectReducer from '../Features/projectSlice';
import repoReducer from '../Features/repoSlice'


const store = configureStore({
    reducer:{
       project : projectReducer,
       repo: repoReducer
    }
})

export default store;