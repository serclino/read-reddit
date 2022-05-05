import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import { selectAllPosts, selectStatus } from "../../features/postsSlice";
import { fetchPosts } from "../../features/postsSlice";

import { SinglePost } from "./singlePost/SinglePost";


// helper function
function formatTimestamp(timestamp) {
  const date = fromUnixTime(timestamp);
  const timeAgo = formatDistanceToNowStrict(date, { addSuffix: true });
  return timeAgo;
}

// component
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
    // console.log(posts);
    return (
        
      <>
        {posts.map((post,id) => <SinglePost key={id} {...post} /> )}
{/*         {posts.map((post, id) => {
          const subreddit = post.data.subreddit_name_prefixed;
          const author = post.data.author;
          const numComments = post.data.num_comments;
          const image = post.data.url.includes(".jpg") ? post.data.url : null;
          const title = post.data.title;
          const text = post.data.selftext;
          //handling time
          const timestamp = post.data.created_utc;
          const time = formatTimestamp(timestamp);

          return (
            <SinglePost
              key={id}
              subreddit={subreddit}
              author={author}
              numComments={numComments}
              image={image}
              title={title}
              text={text}
              time={time}
            />
          );
        })} */}
      </>
    );
  }
};
