import React, { useState, useEffect } from "react";
import "./singleComment.css";
import { formatTimestamp } from "../../../../helpers/helperFunctions";
import arrow from "../../../subreddits/images/arrow.svg";
import defaultUserIcon from "./images/defaultUserIcon.png";

export const SingleComment = ({ author, text, time }) => {
  const [userIcon, setUserIcon] = useState("");

  useEffect(() => {
    async function fetchUserIcon() {
      try {
        const response = await fetch(
          `https://www.reddit.com/user/${author}/about.json`
        );
        if (response.ok) {
          const jsonResponse = await response.json();
          const { snoovatar_img } = jsonResponse.data;

          if (snoovatar_img) {
            setUserIcon(snoovatar_img);
          } else {
            setUserIcon(defaultUserIcon);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserIcon();
  }, []);

  if (!userIcon) {
    return;
  }
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
