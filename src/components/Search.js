import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import ReactPaginate from "react-paginate";
import ApiService from "../service/ApiService";
import "../components/style.css";
import Movie from "./Movie";
import Fade from "react-reveal/Fade";
import ErrorMessage from './ErrorMessage';

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
    const { items } = this.state;

    if (this.state.error) {
      return <ErrorMessage/>
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
                  <Grid item xs={12} md={3} sm={6}>
                    <Movie item={item} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Fade>
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
