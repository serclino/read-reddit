import React, { useEffect, useState } from "react";
import "./subredditsList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubreddits,
  selectAllSubreddits,
  selectStatus,
} from "../../features/subredditsSlice";
import { Link, NavLink } from "react-router-dom";
import { Spinner } from "../spinner/spinner-2/Spinner";

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

  return (
    <>
      <Link to="/" className="home">
        <div className="stripe"></div>
        <img src={home} alt="home" />
        <h6>Home</h6>
      </Link>
      <button
        className="toggle-button"
        onClick={() => setShowSubreddits(!showSubreddits)}
      >
        <img
          src={showArrow}
          alt="toggle arrow"
          className={`${
            showSubreddits && status === "succeeded" ? "arrow-up" : "arrow-down"
          }`}
        />
        <h6>Subreddits</h6>
      </button>

      {status === "loading" ? <Spinner /> : null}

      {showSubreddits
        ? subreddits.map((subreddit, id) => {
            return (
              <div className="links" key={id}>
                <img src={arrow} alt="arrow" />
                <NavLink
                  to={`/${subreddit.subreddit}`}
                  className="link-to-subreddit"
                  activeClassName="clicked-link"
                >
                  {subreddit.subreddit}
                </NavLink>
              </div>
            );
          })
        : null}
    </>
  );
};
