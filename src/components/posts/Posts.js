import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectAllPosts,
  selectStatus,
  fetchPosts,
} from "../../features/postsSlice";
import { selectFilter } from "../../features/filterSlice";

import { SinglePost } from "./singlePost/SinglePost";
import { Spinner } from "../spinner/spinner-1/Spinner";

export const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectStatus);
  const filter = useSelector(selectFilter);
  const { subreddit } = useParams();

  useEffect(() => {
    const payload = { filter, subreddit: subreddit ? subreddit : "popular" };
    dispatch(fetchPosts(payload));
  }, [filter, subreddit]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "succeeded") {
    return (
      <>
        {posts.map((post, id) => (
          <SinglePost key={id} {...post} />
        ))}
      </>
    );
  }
};
