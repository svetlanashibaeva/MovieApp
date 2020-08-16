import React, { Component } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import ApiService from "../service/ApiService";
import Movie from "./Movie";
import "../assets/style.css";
import Fade from "react-reveal/Fade";
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';
import Paginate from "./Paginate";


const filters = {
  popular: { sort_by: "popularity.desc" },
  best: { sort_by: "vote_average.desc", "vote_count.gte": "5000" },
  new: { sort_by: "primary_release_date.desc", "vote_count.gte": "5000" },
};

let activeTab = "popular";

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
    this.changeFilter = this.changeFilter.bind(this);
  }

  loadMovies(page) {
    this.setState({isLoaded: false})
    let _filters = filters[activeTab];
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
    activeTab = eventKey
    this.loadMovies(1);
  };

  render() {
    const { items, error, isLoaded, pageCount, page } = this.state;

    if (error) {
      return <ErrorMessage/>
    }

    if (!isLoaded) {
      return <Spinner />;
    }

    return (
      <>
      <Tabs
          activeKey = {activeTab}
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
              <Grid item xs={6} md={3} sm={6}>
                <Fade>
                  <Movie item={item} />
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container> 
        <Paginate pageCount={pageCount} page={page} onPageChange={this.handlePageClick}/>
      </>
    );
  }
}
