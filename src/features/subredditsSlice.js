import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subredditAvatar from "../components/subreddits/images/reddit-avatar.png";

const initialState = {
  subreddits: [],
  status: "idle",
  error: null,
};

export const fetchSubreddits = createAsyncThunk(
  "subreddits/fetchSubreddits",
  async () => {
    const response = await fetch("https://www.reddit.com/subreddits.json");
    const jsonData = await response.json();
    const newSubreddits = jsonData.data.children.map((subreddit) => {
      const {
        banner_img,
        display_name_prefixed,
        icon_img,
        public_description,
        subscribers,
        title,
        url,
      } = subreddit.data;
      return {
        bannerImg: banner_img,
        subreddit: display_name_prefixed,
        icon: icon_img,
        description: public_description,
        subscribers: subscribers,
        title: title,
        url: url,
      };
    });
    newSubreddits.shift();
    // console.log(newSubreddits);
    return newSubreddits;
  }
);

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSubreddits.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSubreddits.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.subreddits = action.payload;
    },
    [fetchSubreddits.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default subredditsSlice.reducer;

export const selectAllSubreddits = (state) => state.subreddits.subreddits;

export const selectStatus = (state) => state.subreddits.status;

export const selectTargetSubredditIcon = (state, targetSubreddit) => {
  const lookFor = state.subreddits.subreddits.find(
    (item) => item.subreddit === targetSubreddit
  );
  if (lookFor) {
    const icon = lookFor.icon;
    if (icon) {
      return icon;
    } else {
      return subredditAvatar;
    }
  } else {
    return subredditAvatar;
  }
};
