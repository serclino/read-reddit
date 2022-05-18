import React, { useEffect, useState, useRef } from "react";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectFilter } from "../../features/filterSlice";
import { selectSearchTerm } from "../../features/searchSlice";
import { selectTheme } from "../../features/themeSlice";

// images
import hot from "./images/hot.svg";
import hotNight from "./images/hotNight.svg";
import newish from "./images/newish.svg";
import newishNight from "./images/newishNight.svg";
import top from "./images/top.svg";
import topNight from "./images/topNight.svg";

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [location, setLocation] = useState({});
  const baseLine = useRef(null);
  const searchTerm = useSelector(selectSearchTerm);
  const theme = useSelector(selectTheme);

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
    if (element) {
      let coordinates = element.getBoundingClientRect();
      const left = coordinates.left;
      const top = coordinates.top + 48;
      baseLine.current.style.left = `${left}px`;
      baseLine.current.style.top = `${top}px`;
      dispatch(changeFilter({ nameOfFilter: "hot" }));
    }
  }, [searchTerm, dispatch]);

  const divOfFilters = (
    <>
      <div className="base-line" ref={baseLine}></div>
      <div
        className="filter-btn"
        onMouseEnter={getCoordinates}
        onClick={handleClick}
        title="hot"
      >
        <img
          src={!theme ? hotNight : hot}
          alt="hot"
          onClick={handleClick}
          title="hot"
          className={filter === "hot" ? "active-filter" : null}
        />
        <button
          type="button"
          className={!theme ? "night-filter-btn" : null}
          onClick={handleClick}
          title="hot"
        >
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
          src={!theme ? newishNight : newish}
          alt="new"
          onClick={handleClick}
          title="new"
          className={filter === "new" ? "active-filter" : null}
        />
        <button
          type="button"
          className={!theme ? "night-filter-btn" : null}
          onClick={handleClick}
          title="new"
        >
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
          src={!theme ? topNight : top}
          alt="top"
          onClick={handleClick}
          title="top"
          className={filter === "top" ? "active-filter" : null}
        />
        <button
          type="button"
          className={!theme ? "night-filter-btn" : null}
          onClick={handleClick}
          title="top"
        >
          Top
        </button>
      </div>
    </>
  );

  const searching = (
    <div className={!theme ? "night-searching" : null} id="searching">
      Search results for <span>'{searchTerm}'</span>
    </div>
  );

  return (
    <section
      className={!theme ? "filter-container night-f-c" : "filter-container"}
    >
      {!searchTerm ? divOfFilters : searching}
    </section>
  );
};
