import React from "react";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectFilter } from "../../features/filterSlice";

// images
import hot from "./images/hot.svg";
import newish from "./images/newish.svg";
import top from "./images/top.svg";

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <section className="filter-container">
      
      <div
        className="filter-btn"
        onClick={() => dispatch(changeFilter({ nameOfFilter: "hot" }))}
      >
        <img src={hot} alt="hot" />
        <button type="button">Hot</button>
      </div>

      <div
        className="filter-btn middle"
        onClick={() => dispatch(changeFilter({ nameOfFilter: "new" }))}
      >
        <img src={newish} alt="new" />
        <button type="button">New</button>
      </div>

      <div
        className="filter-btn"
        onClick={() => dispatch(changeFilter({ nameOfFilter: "top" }))}
      >
        <img src={top} alt="top" />
        <button type="button">Top</button>
      </div>
    </section>
  );
};
