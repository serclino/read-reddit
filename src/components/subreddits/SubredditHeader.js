import React from "react";
import "./subredditHeader.css";
import { selectAllSubreddits } from "../../features/subredditsSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const SubredditHeader = () => {
  const allSubreddits = useSelector(selectAllSubreddits);
  const { subreddit } = useParams();
  const mySubreddit = "r/" + subreddit;
  const desiredProps = allSubreddits.find(item => item.subreddit === mySubreddit);
  const { description, subscribers, title} = desiredProps;
  const bannerImg = desiredProps.bannerImg;

  return (
      <>
      <img src={bannerImg} alt="" />
      <h1>{mySubreddit}</h1>
      <h2>{title}</h2>
      <h3>{description}</h3>
      <h4>{subscribers}</h4>
      </>
  );
};
