import React, { Component } from "react";
import Header from "./components/Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Search from "./components/Search";
import MovieItem from "./components/MovieItem";
import CharItem from "./components/CharItem";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header />

          <Switch>
            <Route path="/" component={MovieList} exact />
            <Route
              path="/movie/:id"
              render={({ match }) => {
                const { id } = match.params;
                return <MovieItem movieId={id} />;
              }}
            />
            <Route
              path="/search/:query"
              render={({ match }) => {
                const { query } = match.params;
                return <Search query={query} />;
              }}
            />
            <Route
              path="/person/:id"
              render={({match}) => {
                const {id} = match.params;
                return <CharItem charID={id} />;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
