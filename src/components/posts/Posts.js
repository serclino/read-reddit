import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectAllPosts,
  selectStatus,
  fetchPosts,
  fetchPostsBasedOnSearchTerm,
} from "../../features/postsSlice";
import { selectFilter } from "../../features/filterSlice";
import { selectSearchTerm, changeSearchTerm } from "../../features/searchSlice";

import { SinglePost } from "./singlePost/SinglePost";
import { Spinner } from "../spinner/spinner-1/Spinner";

export const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectStatus);
  const filter = useSelector(selectFilter);
  const url = useParams();

  const { subreddit } = useParams();
  const searchTerm = useSelector(selectSearchTerm);

  useEffect(() => {
    const payload = { filter, subreddit: subreddit ? subreddit : "popular" };
    if (searchTerm) {
      dispatch(fetchPostsBasedOnSearchTerm(searchTerm));
      dispatch(changeSearchTerm({ searchTerm: "" }));
      return;
    }
    dispatch(fetchPosts(payload));
  }, [filter, url]);

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
