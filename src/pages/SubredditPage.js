import React from "react";
import { Posts } from "../components/posts/Posts";
import { SubredditHeader } from "../components/subreddits/SubredditHeader";

export const SubredditPage = () => {
  return (
    <>
      <SubredditHeader />
      <Posts />
    </>
  );
};
