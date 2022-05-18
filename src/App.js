import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import { Navbar } from "./components/navbar/Navbar";
import { Subreddits } from "./components/subreddits/SubredditsList";
import { Filter } from "./components/filter/Filter";
import { HomePage } from "./pages/HomePage";
import { SubredditPage } from "./pages/SubredditPage";
import { SearchPage } from "./pages/SearchPage";
import { ErrorPage } from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="mainContent">
        <section className="subreddits-aside">
          <Subreddits />
        </section>
        <section className="filter-and-posts">
          <Filter />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/r/:subreddit" component={SubredditPage} />
            <Route exact path="/search/:searchTerm" component={SearchPage} />
            <Route exact path="/:error" component={ErrorPage} />
            <Redirect to="/" />
          </Switch>
        </section>
      </div>
    </>
  );
}

export default App;
