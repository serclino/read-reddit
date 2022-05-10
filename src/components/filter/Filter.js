import React, { useEffect, useState, useRef } from "react";
import "./filter.css";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../features/filterSlice";

// images
import hot from "./images/hot.svg";
import newish from "./images/newish.svg";
import top from "./images/top.svg";

export const Filter = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({});
  const baseLine = useRef(null);

  const getCoordinates = (e) => {
    const coordinates = e.target.getBoundingClientRect();
    // console.log(coordinates);
    const left = coordinates.left;
    setLocation({ left });
  };

  // at initial render
  useEffect(() => {
    let element = document.querySelector(".filter-btn");
    let coordinates = element.getBoundingClientRect();
    const left = coordinates.left;
    const top = coordinates.top + 48;
    baseLine.current.style.left = `${left}px`;
    baseLine.current.style.top = `${top}px`;
  }, []);

  // after location changed
  useEffect(() => {
    const bLine = baseLine.current;
    const { left } = location;
    bLine.style.left = `${left}px`;
  }, [location]);

  return (
    <section className="filter-container">
      <div className="base-line" ref={baseLine}></div>
      <div
        className="filter-btn"
        onMouseEnter={getCoordinates}
        onClick={() => dispatch(changeFilter({ nameOfFilter: "hot" }))}
      >
        <img src={hot} alt="hot" />
        <button type="button">Hot</button>
      </div>
      <div
        className="filter-btn middle"
        onMouseEnter={getCoordinates}
        onClick={() => dispatch(changeFilter({ nameOfFilter: "new" }))}
      >
        <img src={newish} alt="new" />
        <button type="button">New</button>
      </div>
      <div
        className="filter-btn"
        onMouseEnter={getCoordinates}
        onClick={() => dispatch(changeFilter({ nameOfFilter: "top" }))}
      >
        <img src={top} alt="top" />
        <button type="button">Top</button>
      </div>
    </section>
  );
};
