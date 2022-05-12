import React, { useState } from "react";
import "./singlePost.css";
import { useSelector } from "react-redux";
import { selectTargetSubredditIcon } from "../../../features/subredditsSlice";

export const SinglePost = ({
  author,
  subreddit,
  time,
  title,
  text,
  image,
  numOfComments,
}) => {
  const [isTextLong, setIsTextLong] = useState(text && text.length > 250);
  const icon = useSelector((state) => selectTargetSubredditIcon(state, subreddit));

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

      <button>
        <span>{numOfComments} comments</span>
      </button>
    </article>
  );
};
