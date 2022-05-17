import React, { useState } from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchTerm } from "../../features/searchSlice";
import { useHistory } from "react-router-dom";
import { toggleTheme, selectTheme } from "../../features/themeSlice";

// images
import logo from "./images/logo.png";
import logoNight from './images/logo-night.png'
import search from "./images/search.svg";
import searchNight from './images/search-night.svg';
import day from "./images/day.svg";
import github from "./images/github.png";
import night from './images/night.svg'

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useSelector(selectTheme);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(searchTerm);
    dispatch(changeSearchTerm({ searchTerm }));
    history.push(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <nav className={!theme ? 'night-nav' : null}>
      <section className="nav-content">
        <div className="logo">
          <a href="http://localhost:3000/">
            <img src={!theme ? logoNight : logo} alt="logo" />
          </a>
        </div>
        <form className={!theme ? 'night-form search-bar' : 'search-bar'} onSubmit={handleSubmit}>
          <label htmlFor="searchTerm">
            <button
              className={!theme? 'search-icon night-search-icon' : 'search-icon'}
              type="button"
              onClick={handleSubmit}
            >
              <img src={!theme ? searchNight : search} alt="" />
            </button>
          </label>
          <input
            type="text"
            className={!theme ? 'night-input' : 'day-input'}
            id="searchTerm"
            placeholder="Search for Topics"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="nav-icons">
          <button onClick={() => dispatch(toggleTheme())} className="day">
            <img src={!theme ? day : night} alt="day" />
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
