import React, {useState} from "react";
import { SingleComment } from "./SingleComment";

export const Comments = ({ comments }) => {
    const [allComments, setAllComments] = useState(comments);



  return <section className="comments"> {/* styling for this class is inside singlePost.css */}
      {allComments.map((comment,id) => {
          return <SingleComment {...comment} key={id} />
      })}
  </section>;
};
