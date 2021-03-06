import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import ApiService from "../service/ApiService";
import "../assets/style.css";
import Movie from "./Movie";
import Fade from "react-reveal/Fade";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import Paginate from "./Paginate";

let query = "";

export default class Search extends Component {
  apiService = new ApiService();

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      pageCount: 10,
      items: [],
      page: 0,
      item: null,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  searchMovies(page) {
    this.setState({ isLoaded: false });
    this.apiService
      .searchMovies({ sort_by: "popularity.desc", page: page, query: query })
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

  componentDidMount() {
    query = this.props.query;
    this.searchMovies(1);
  }

  componentDidUpdate() {
    if (query !== this.props.query) {
      query = this.props.query;
      this.searchMovies(1);
    }
  }

  handlePageClick = (e) => {
    this.searchMovies(e.selected + 1);
    // eslint-disable-next-line no-restricted-globals
    window.scrollTo(pageXOffset, 0);
  };

  render() {
    const { items, error, isLoaded, pageCount, page } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    if (!isLoaded) {
      return <Spinner />;
    }

    return (
      <>
        <Container>
          <Fade>
            {items.length === 0 ? (
              <h3 style={{ textAlign: "center" }}> Ничего не нашлось </h3>
            ) : (
              <Grid container spacing={3}>
                {items.map((item) => (
                  <Grid item xs={6} md={3} sm={6}>
                    <Movie item={item} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Fade>
        </Container>

        <Paginate
          pageCount={pageCount}
          page={page}
          onPageChange={this.handlePageClick}
        />
      </>
    );
  }
}
