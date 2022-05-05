import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

// helper function
function formatTimestamp(timestamp) {
  const date = fromUnixTime(timestamp);
  const timeAgo = formatDistanceToNowStrict(date, { addSuffix: true });
  return timeAgo;
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://www.reddit.com/r/popular.json");
  const jsonData = await response.json();
  const newPosts = jsonData.data.children.map(post => {
    const { subreddit_name_prefixed, author, num_comments, title, selftext } =
      post.data;
    // handling fetching img
    const image = post.data.url.includes(".jpg") ? post.data.url : null;
    // handling time
    const timestamp = post.data.created_utc;
    const time = formatTimestamp(timestamp);
    return {
      author: author,
      subreddit: subreddit_name_prefixed,
      time: time,
      title: title,
      text: selftext,
      image: image,
      numOfComments: num_comments,
    };
  });
  return newPosts;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload; // TO-DO
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectStatus = (state) => state.posts.status;
