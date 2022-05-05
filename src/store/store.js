import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postsSlice";
import filterReducer from "../features/filterSlice";
import subredditsReducer from "../features/subredditsSlice";

export default configureStore({
  reducer: {
    posts: postReducer,
    filter: filterReducer,
    subreddits: subredditsReducer
  },
});
