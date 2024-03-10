import {configureStore} from "@reduxjs/toolkit";
import UsersSlice from "../Components/Features/UsersSlice";
import RepoSlice from "../Components/Features/RepoSlice";

const store = configureStore({
    reducer: {
       user: UsersSlice,
       repo: RepoSlice,
    }
  })

  export default store;
  