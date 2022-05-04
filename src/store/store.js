import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postsSlice";

export default configureStore({
  reducer: {
    posts: postReducer,
  },
});
