import React from "react";
import "./singlePost.css";

export const SinglePost = ({
  author,
  subreddit,
  time,
  title,
  text,
  image,
  numOfComments
}) => {
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
      {text ? <p className="selftext">{text}</p> : null}
      <a href="/">{numOfComments} comments</a>
    </div>
  );
};
