import React, { useState } from "react";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { changeSearchTerm } from "../../features/searchSlice";
import { useHistory } from "react-router-dom";

// images
import logo from "./images/logo.png";
import search from "./images/search.svg";
import day from "./images/day.png";
import github from "./images/github.png";

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(searchTerm);
    dispatch(changeSearchTerm({ searchTerm }));
    history.push(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <nav>
      <section className="nav-content">
        <div className="logo">
          <a href="http://localhost:3000/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <form className="search-bar" onSubmit={handleSubmit}>
          <label htmlFor="searchTerm">
            <button
              className="search-icon"
              type="button"
              onClick={handleSubmit}
            >
              <img src={search} alt="" />
            </button>
          </label>
          <input
            type="text"
            id="searchTerm"
            placeholder="Search for Topics"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="nav-icons">
          <button className="day">
            <img src={day} alt="day" />
          </button>
          <div className="github">
            <a href="https://github.com/serclino" target="_blank">
              <img src={github} alt="" />
            </a>
          </div>
        </div>
      </section>
    </nav>
  );
};
