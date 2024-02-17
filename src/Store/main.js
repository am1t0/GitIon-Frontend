import {configureStore} from "@reduxjs/toolkit";
import UsersSlice from "../Components/Features/UsersSlice";

const store = configureStore({
    reducer: {
       user: UsersSlice,
    }
  })

  export default store;
  