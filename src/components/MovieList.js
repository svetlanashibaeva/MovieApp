import React, { Component } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import ReactPaginate from "react-paginate";
import ApiService from "../service/ApiService";
import Movie from "./Movie";
import "../assets/style.css";
import Fade from "react-reveal/Fade";
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';


const filters = {
  popular: { sort_by: "popularity.desc" },
  best: { sort_by: "vote_average.desc", "vote_count.gte": "5000" },
  new: { sort_by: "primary_release_date.desc", "vote_count.gte": "5000" },
};



let filtersActive = filters.popular;

export default class MovieList extends Component {
  apiService = new ApiService();

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      pageCount: 10,
      items: [],
      page: 0,
      item: null
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  loadMovies(page) {
    let _filters = filtersActive;
    _filters["page"] = page;
    this.apiService
      .fetchMovies(_filters)
      .then((data) => {
        this.setState({
          isLoaded: true,
          pageCount: data.total_pages,
          items: data.results,
          page: data.page - 1,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  handlePageClick = (e) => {
    this.loadMovies(e.selected + 1);
    // eslint-disable-next-line no-restricted-globals 
    window.scrollTo(pageXOffset, 0);
  };

  componentDidMount() {
    this.loadMovies(1);
  }
  

  changeFilter = (eventKey) => {
    if (eventKey === "popular") {
      filtersActive = filters.popular;
    } else if (eventKey === "best") {
      filtersActive = filters.best;
    } else if (eventKey === "new") {
      filtersActive = filters.new;
    }
    this.loadMovies(1);
  };

  render() {
    const { items } = this.state;

    if (this.state.error) {
      return <ErrorMessage/>
    }

    if (!this.state.isLoaded) {
      return <Spinner/>
    }

    return (
      <>
      <Tabs
          defaultActiveKey="popular"
          id="uncontrolled-tab-example"
          onSelect={this.changeFilter}
        >
          <Tab eventKey="popular" title="Популярное" />
          <Tab eventKey="best" title="Лучшее" />
          <Tab eventKey="new" title="Новое" />
        </Tabs>

        <Container>
          <Grid container spacing={3}>
            {items.map((item) => (
              <Grid item xs={12} md={3} sm={6}>
                <Fade>
                  <Movie item={item} />
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
        
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          forcePage={this.state.page}
        />
      </>
    );
  }
}
