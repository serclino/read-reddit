import React, { useState } from "react";
import "./singlePost.css";
import { useSelector } from "react-redux";
import { selectTargetSubredditIcon } from "../../../features/subredditsSlice";
import { Comments } from "./comments/Comments";

export const SinglePost = ({
  author,
  subreddit,
  time,
  title,
  text,
  image,
  numOfComments,
  id,
}) => {
  const [isTextLong, setIsTextLong] = useState(text && text.length > 250);
  const [comments, setComments] = useState(null);
  const [loadingComments, setLoadingComments] = useState("idle");
  const icon = useSelector((state) =>
    selectTargetSubredditIcon(state, subreddit)
  );

  const handleClick = async (subreddit, id) => {
    setLoadingComments("loading");
    // fetch comments
    const response_1 = await fetch(
      `https://www.reddit.com/${subreddit}/comments/${id}.json`
    );
    const jsonResponse = await response_1.json();
    const comments = jsonResponse[1].data.children;
    // destructuring comments
    const destructuredComms = comments.map((comment) => {
      const { author, body, created_utc } = comment.data;
      return { author: author, text: body, time: created_utc };
    });
    // console.log(destructuredComms);
    setComments(destructuredComms);
    setLoadingComments("succeeded");
  };

  return (
    <article className="single-post">
      <div className="head">
        <img src={icon} alt="reddit-avatar" className="reddit-avatar" />
        <h5>{author}</h5>
        <p className="subreddit-para">to {subreddit}</p>
        <p className="time">{time}</p>
      </div>
      <h4>{title}</h4>
      {text ? (
        isTextLong ? (
          <p className="selftext">
            {text.substring(0, 250)}
            <button
              className="show-more"
              type="button"
              onClick={() => setIsTextLong(!isTextLong)}
            >
              ...continue reading
            </button>
          </p>
        ) : (
          <p className="selftext">{text}</p>
        )
      ) : null}
      {image ? (
        <div className="image-container">
          <img src={image} alt={title} />
        </div>
      ) : null}

      {loadingComments === "loading" ? "Loading comments..." : null}

      {loadingComments === "succeeded" ? (
        <Comments comments={comments} />
      ) : null}

      <button onClick={() => handleClick(subreddit, id)}>
        Comments <div className="white-stripe"></div> <span>{numOfComments}</span>
      </button>
    </article>
  );
};
