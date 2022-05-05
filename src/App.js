import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar } from "./components/navbar/Navbar";
import { Subreddits } from "./components/subreddits/SubredditsList";
import { HomePage } from "./pages/HomePage";
import { SubredditPage } from "./pages/SubredditPage";
import { SearchPage } from "./pages/SearchPage";
import { ErrorPage } from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Subreddits />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/r/:subreddit" component={SubredditPage} />
        <Route exact path="/search/:searchTerm" component={SearchPage} />
        <Route exact path="/:error" component={ErrorPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
