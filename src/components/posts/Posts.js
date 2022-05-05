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
    console.log(posts);
    return (
      <>
        {posts.map((post, id) => {
          const subreddit = post.data.subreddit_name_prefixed;
          const author = post.data.author;
          const numComments = post.data.num_comments;
          const image = post.data.url.includes('.jpg') ? post.data.url : null;
          const title = post.data.title;
          // console.log(image);
          //console.log(subreddit);
          return (
            <SinglePost
              key={id}
              subreddit={subreddit}
              author={author}
              numComments={numComments}
              image={image}
              title={title}
            />
          );
        })}
      </>
    );
  }
};
