import React, { useCallback, useEffect, useState } from "react";
import './comments.css';
import { SingleComment } from "./SingleComment";
import { selectTheme } from "../../../../features/themeSlice";
import { useSelector } from "react-redux";

export const Comments = ({ comments }) => {
  const [allComments] = useState(comments);
  const [displayedComments, setDisplayedComments] = useState([]);
  const theme = useSelector(selectTheme)

/*   const displayComms = () => {
    const splice = allComments.splice(0, 3);
    setDisplayedComments(prevState => prevState.concat(splice));
  }; */

  const displayComms = useCallback(
    () => {
      const splice = allComments.splice(0,3);
      setDisplayedComments(prevState => prevState.concat(splice));
    },
    [allComments]
  )

  useEffect(() => {
    displayComms();
  }, [displayComms]);

  return (
    <section className={!theme ? 'comments-night comments' : 'comments'}>
      {/* styling for this class is inside singlePost.css */}
      {displayedComments.map((comment, id) => {
        return <SingleComment {...comment} key={id} />;
      })}
      {allComments.length !== 0 ? (
        <button onClick={displayComms}>Show more comments</button>
      ) : (
        <p className={!theme ? 'no-more-night' : null}>No more comments here</p>
      )}
    </section>
  );
};
