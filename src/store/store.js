import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postsSlice";
import filterReducer from "../features/filterSlice";

export default configureStore({
  reducer: {
    posts: postReducer,
    filter: filterReducer,
  },
});
