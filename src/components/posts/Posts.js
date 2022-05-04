import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, selectStatus } from "../../features/postsSlice";
import { fetchPosts } from "../../features/postsSlice";

import { SinglePost } from "./singlePost/SinglePost";

export const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "succeeded") {
    //console.log(posts);
    return (
      <>
        {posts.map((post) => {
          const subreddit = post.data.subreddit;
          //console.log(subreddit);
          return <SinglePost subreddit={subreddit} />;
        })}
      </>
    );
  }
};
