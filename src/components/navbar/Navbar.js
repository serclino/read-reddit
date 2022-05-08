import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

// images
import logo from "./images/logo.png";
import day from "./images/day.png";
import github from "./images/github.png";

export const Navbar = () => {
  return (
    <nav>
      <section className="nav-content">
        <div className="logo">
          <a href="http://localhost:3000/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <form className="search-bar">
          <label htmlFor="searchTerm">
            <div className="search-icon">
              <img src={day} alt="" />
            </div>
          </label>
          <input type="text" id="searchTerm" placeholder="Search for Topics" />
        </form>
        <div className="nav-icons">
          <button className="day">
            <img src={day} alt="day" />
          </button>
          <div className="github">
            <a href="https://github.com/serclino" target='_blank'>
              <img src={github} alt="" />
            </a>
          </div>
        </div>
      </section>
    </nav>
  );
};
