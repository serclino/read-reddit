import React from "react";
import "./singlePost.css";

export const SinglePost = ({
  subreddit,
  author,
  numComments,
  image,
  title,
  text,
  time
}) => {
  return (
    <>
      <h5>author : {author}</h5>
      <p>to {subreddit}</p>
      <p className="time">{time}</p>
      <h4>{title}</h4>
      {image ? (
        <div className="image">
          <img src={image} alt={title} />
        </div>
      ) : null}
      {text ? <p className="selftext">{text}</p> : null}

      <a href="/">{numComments} comments</a>
    </>
  );
};
