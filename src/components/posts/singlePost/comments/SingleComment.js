import React, { useState, useEffect } from "react";
import './singleComment.css';
import { formatTimestamp } from "../../../../helpers/helperFunctions";
import showArrow from "../../../subreddits/images/showArrow.svg";
import arrow from "../../../subreddits/images/arrow.svg";
import defaultUserIcon from "./images/defaultUserIcon.png";

export const SingleComment = ({ author, text, time }) => {
  const [userIcon, setUserIcon] = useState("");

  useEffect(() => {
    async function fetchUserIcon() {
      const response = await fetch(
        `https://www.reddit.com/user/${author}/about.json`
      );
      const jsonResponse = await response.json();
      const { snoovatar_img } = jsonResponse.data;
      if (snoovatar_img) {
        setUserIcon(snoovatar_img);
      } else {
        setUserIcon(defaultUserIcon);
      }
    }
    fetchUserIcon();
  }, []);

  if (!time) {
    return;
  }
  const formattedTime = formatTimestamp(time);

  return (
    <article className="singleComment">
      <div className="comment-header">
        <img src={arrow} alt="arrow" className="comment-arrow" />
        <img src={userIcon} alt="user's icon" className="userIcon" />
        <h5>{author}</h5>
        <p className="time">{formattedTime}</p>
      </div>
      <div className="comment-selftext">
        <p className="selftext">{text}</p>
      </div>

    </article>
  );
};
