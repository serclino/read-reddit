import React, { useEffect, useState, useRef } from "react";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectFilter } from "../../features/filterSlice";
import { selectSearchTerm } from "../../features/searchSlice";

// images
import hot from "./images/hot.svg";
import newish from "./images/newish.svg";
import top from "./images/top.svg";

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [location, setLocation] = useState({});
  const baseLine = useRef(null);
  const searchTerm = useSelector(selectSearchTerm);

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
    console.log("ahoj!");
    let element = document.querySelector(".filter-btn");
    if (element) {
      let coordinates = element.getBoundingClientRect();
      const left = coordinates.left;
      const top = coordinates.top + 48;
      baseLine.current.style.left = `${left}px`;
      baseLine.current.style.top = `${top}px`;
          dispatch(changeFilter({ nameOfFilter: 'hot' }));
    }
  }, [searchTerm]); // or trigger when url changed

  const divOfFilters = (
    <>
      {" "}
      <div className="base-line" ref={baseLine}></div>
      <div
        className="filter-btn"
        onMouseEnter={getCoordinates}
        onClick={handleClick}
        title="hot"
      >
        <img
          src={hot}
          alt="hot"
          onClick={handleClick}
          title="hot"
          className={filter === "hot" ? "active-filter" : null}
        />
        <button type="button" onClick={handleClick} title="hot">
          Hot
        </button>
      </div>
      <div
        className="filter-btn"
        onMouseEnter={getCoordinates}
        onClick={handleClick}
        title="new"
      >
        <img
          src={newish}
          alt="new"
          onClick={handleClick}
          title="new"
          className={filter === "new" ? "active-filter" : null}
        />
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
        <img
          src={top}
          alt="top"
          onClick={handleClick}
          title="top"
          className={filter === "top" ? "active-filter" : null}
        />
        <button type="button" onClick={handleClick} title="top">
          Top
        </button>
      </div>
    </>
  );

  const searching = <div id="searching">Search results for <span>'{searchTerm}'</span></div>;

  return (
    <section className="filter-container">
      {!searchTerm ? divOfFilters : searching}
    </section>
  );
};
