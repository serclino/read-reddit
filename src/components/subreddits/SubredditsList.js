import React, { useEffect, useState } from "react";
import "./subredditsList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubreddits,
  selectAllSubreddits,
  selectStatus,
} from "../../features/subredditsSlice";
import { Link } from "react-router-dom";

// images
import home from "./images/home.svg";
import showArrow from "./images/showArrow.svg";
import arrow from "./images/arrow.svg";

export const Subreddits = () => {
  const [showSubreddits, setShowSubreddits] = useState(true);
  const dispatch = useDispatch();
  const subreddits = useSelector(selectAllSubreddits);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, []);

  if (status === "loading") {
    return "Loading subreddits...";
  }

  return (
    <>
      <Link to='/' className="home">
        <div className="stripe"></div>
        <img src={home} alt="home" />
        <h6>Home</h6>
      </Link>
      <button
        className='toggle-button'
        onClick={() => setShowSubreddits(!showSubreddits)}
      >
        <img src={showArrow} alt="toggle arrow" className={`${showSubreddits ? null : 'arrow-down'}`} />
        <h6>Subreddits</h6>
      </button>

      {showSubreddits
        ? subreddits.map((subreddit) => {
            return <h6>{subreddit.subreddit}</h6>;
          })
        : null}
    </>
  );
};
