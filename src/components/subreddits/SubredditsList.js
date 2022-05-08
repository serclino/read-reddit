import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubreddits,
  selectAllSubreddits,
  selectStatus,
} from "../../features/subredditsSlice";

export const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectAllSubreddits);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, []);

  if (status === 'loading') {
    return "Loading subreddits..."
  }

  return (
    <>
      {subreddits.map((subreddit) => {
        return <p>{subreddit.subreddit}</p>;
      })}
    </>
  );
};
