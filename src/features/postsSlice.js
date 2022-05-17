import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formatTimestamp } from "../helpers/helperFunctions";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (payload) => {
    const { filter, subreddit } = payload;
    // console.log(`https://www.reddit.com/r/${subreddit}/${filter}.json`);
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/${filter}.json`
    );
    const jsonData = await response.json();
    // console.log(jsonData);
    const newPosts = jsonData.data.children.map((post) => {
      const { subreddit_name_prefixed, author, num_comments, title, id } =
        post.data;
      // handling fetching text
      const text = post.data.selftext ? post.data.selftext : null;
      // handling fetching img
      let image = post.data.url;
      if (image.includes('.jpg') || image.includes('.png')) {
      } else {
        image = null;
      }
      // handling time
      const timestamp = post.data.created_utc;
      const time = formatTimestamp(timestamp);
      return {
        author: author,
        subreddit: subreddit_name_prefixed,
        time: time,
        title: title,
        text: text,
        image: image,
        numOfComments: num_comments,
        id: id,
      };
    });
    return newPosts;
  }
);

export const fetchPostsBasedOnSearchTerm = createAsyncThunk(
  "posts/fetchPostsBasedOnSearchTerm",
  async (searchTerm) => {
    // console.log(`https://www.reddit.com/search.json?q=${searchTerm}`);
    const response = await fetch(
      `https://www.reddit.com/search.json?q=${searchTerm}`
    );
    const jsonData = await response.json();
    // console.log(jsonData);
    const newPosts = jsonData.data.children.map((post) => {
      const { subreddit_name_prefixed, author, num_comments, title, id } =
        post.data;
      // handling fetching text
      const text = post.data.selftext ? post.data.selftext : null;
      // handling fetching img
      let image = post.data.url;
      if (image.includes(".jpg") || image.includes(".png")) {
      } else {
        image = null;
      }
      // handling time
      const timestamp = post.data.created_utc;
      const time = formatTimestamp(timestamp);
      return {
        author: author,
        subreddit: subreddit_name_prefixed,
        time: time,
        title: title,
        text: text,
        image: image,
        numOfComments: num_comments,
        id: id,
      };
    });
    return newPosts;
  }
);

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
      })
      .addCase(fetchPostsBasedOnSearchTerm.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPostsBasedOnSearchTerm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload; // TO-DO
      })
      .addCase(fetchPostsBasedOnSearchTerm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectStatus = (state) => state.posts.status;
