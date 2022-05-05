import React, { useState } from "react";
import "./singlePost.css";

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

  return (
    <div className="single-post">
      <h5>author : {author}</h5>
      <p>to {subreddit}</p>
      <p className="time">{time}</p>
      <h4>{title}</h4>
      {image ? (
        <div className="image">
          <img src={image} alt={title} />
        </div>
      ) : null}

      {text ? (
        isTextLong ? (
          <p className="selftext">
            {text.substring(0, 250)}...
            <button
              className="show-more"
              type="button"
              onClick={() => setIsTextLong(!isTextLong)}
            >
              Show more
            </button>
          </p>
        ) : (
          <p className="selftext">{text}</p>
        )
      ) : null}

      <a href="/">{numOfComments} comments</a>
    </div>
  );
};
