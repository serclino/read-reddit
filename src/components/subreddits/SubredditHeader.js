import React, { useEffect } from "react";
import "./subredditHeader.css";
import { selectAllSubreddits } from "../../features/subredditsSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import defaultBg from './images/default-bg.jpg';

export const SubredditHeader = () => {
  const allSubreddits = useSelector(selectAllSubreddits);
  const { subreddit } = useParams();
  const mySubreddit = "r/" + subreddit;
  const desiredProps = allSubreddits.find(
    (item) => item.subreddit === mySubreddit
  );
  const { description, subscribers, title } = desiredProps;
  let bannerImg = desiredProps.bannerImg;
  if (!bannerImg) {
      bannerImg = defaultBg;
  }

  useEffect(() => {
    let element = document.querySelector(".subreddit-header");
    element.style.backgroundImage = `url(${bannerImg})`;
  }, [title]);

  return (
    <>
      <div className="subreddit-header">
        <h1>{title}</h1>
        <p className="mySubreddit">{mySubreddit}</p>
        <p className="subscribers">{subscribers} subscribers</p>
      </div>
      <div className="description">
        <h2>About community:</h2>
        <p>{description}</p>
      </div>
    </>
  );
};
