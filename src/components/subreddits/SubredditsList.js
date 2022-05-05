import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubreddits,
  selectAllSubreddits,
} from "../../features/subredditsSlice";

export const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectAllSubreddits);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, []);

  return (
    <>
      {subreddits.map((subreddit) => {
        return <p>{subreddit.subreddit}</p>;
      })}
    </>
  );
};
