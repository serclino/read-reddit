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

  const handleClick = (e) => {
    const newType = e.target.title;
    dispatch(changeFilter({ nameOfFilter: newType }));
    const bLine = baseLine.current;
    const { left } = location;
    bLine.style.left = `${left}px`;
  };

  const getCoordinates = (e) => {
    const coordinates = e.target.getBoundingClientRect();
    const left = coordinates.left;
    setLocation({ left });
  };

  // on initial render
  useEffect(() => {
    let element = document.querySelector(".filter-btn");
    let coordinates = element.getBoundingClientRect();
    const left = coordinates.left;
    const top = coordinates.top + 48;
    baseLine.current.style.left = `${left}px`;
    baseLine.current.style.top = `${top}px`;
  }, []);

  return (
    <section className="filter-container">
      <div className="base-line" ref={baseLine}></div>
      <div
        className="filter-btn"
        onMouseEnter={getCoordinates}
        onClick={handleClick}
        title="hot"
      >
        <img src={hot} alt="hot" onClick={handleClick} title="hot" />
        <button type="button" onClick={handleClick} title="hot">
          Hot
        </button>
      </div>
      <div
        className="filter-btn middle"
        onMouseEnter={getCoordinates}
        onClick={handleClick}
        title="new"
      >
        <img src={newish} alt="new" onClick={handleClick} title="new" />
        <button type="button" onClick={handleClick} title="new">
          New
        </button>
      </div>
      <div
        className="filter-btn"
        onMouseEnter={getCoordinates}
        onClick={handleClick}
        title="top"
      >
        <img src={top} alt="top" onClick={handleClick} title="top" />
        <button type="button" onClick={handleClick} title="top">
          Top
        </button>
      </div>
    </section>
  );
};
