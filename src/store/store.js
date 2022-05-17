import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postsSlice";
import filterReducer from "../features/filterSlice";
import subredditsReducer from "../features/subredditsSlice";
import searchReducer from "../features/searchSlice";
import themeReducer from "../features/themeSlice";

export default configureStore({
  reducer: {
    posts: postReducer,
    filter: filterReducer,
    subreddits: subredditsReducer,
    search: searchReducer,
    theme: themeReducer,
  },
});
