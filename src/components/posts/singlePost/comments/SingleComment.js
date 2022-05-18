import React, { useState, useEffect } from "react";
import "./singleComment.css";
import { formatTimestamp } from "../../../../helpers/helperFunctions";
import arrow from "../../../subreddits/images/arrow.svg";
import arrowNight from '../../../subreddits/images/arrowNight.svg'
import defaultUserIcon from "./images/defaultUserIcon.png";
import { selectTheme } from "../../../../features/themeSlice";
import { useSelector } from "react-redux";

export const SingleComment = ({ author, text, time }) => {
  const [userIcon, setUserIcon] = useState("");
  const theme = useSelector(selectTheme)

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
  }, [author]);

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
        <img src={!theme ? arrowNight : arrow} alt="arrow" className="comment-arrow" />
        <img src={userIcon} alt="user's icon" className="userIcon" />
        <h5 className={!theme ? 'night-author-h5' : null}>{author}</h5>
        <p className={!theme ? 'time night-para' : 'time'}>{formattedTime}</p>
      </div>
      <div className={!theme ? 'comment-selftext night-c-s' : 'comment-selftext'}>
        <p className={!theme ? 'selftext night-selftext' : 'selftext'}>{text}</p>
      </div>
    </article>
  );
};
