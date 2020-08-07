import React, { Component } from "react";
import { Container, Row, Col, Media } from "react-bootstrap";
import ApiService from "../service/ApiService";
import { Link } from "react-router-dom";
import Moment from "moment";
import { Box } from "@material-ui/core";
import Fade from "react-reveal/Fade";

const boxStyles = {
  backgroundColor: "#28a745",
  padding: "2px 5px",
  position: "absolute",
  color: "#ffffff",
};

const genresStyle = {
  display: "inline",
  color: "#28a745",
  fontWeight: "bold",
};

const back = {
  backgroundColor: "#28a745",
  padding: "5px 10px",
  color: "#fff",
};

export default class MovieItem extends Component {
  apiService = new ApiService();

  constructor(props) {
    super(props);

    this.state = {
      movieId: props.movieId,
      data: {},
      genres: [],
    };
  }

  showMovieInfo() {
    this.apiService
      .showMovieInfo(this.state.movieId)
      .then((data) => {
        this.setState({
          isLoaded: true,
          data: data,
          genres: data.genres,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  componentDidMount() {
    this.showMovieInfo();
  }

  render() {
    const { data, genres } = this.state;
    return (
      <>
        <Fade>
          <Container style={{ marginTop: "20px" }}>
            <Link
              to="/"
              style={back}
              onClick={() => {
                document.getElementById("searchForm").value = "";
              }}
            >
              {" "}
              ← Назад{" "}
            </Link>
            <Row style={{ marginTop: "20px" }}>
              <Col sm={5}>
                <Box component="span" m={1} style={boxStyles}>
                  {data.vote_average}
                </Box>
                <Media>
                  <img
                    // height="450px"
                    className="mr-3"
                    src={`https://image.tmdb.org/t/p/w300///${data.poster_path}`}
                    alt="Generic placeholder"
                  />
                </Media>
              </Col>
              <Col sm={7}>
                <Media>
                  <Media.Body>
                    <h2> {data.title} </h2>
                    <div>
                      Дата релиза:{" "}
                      {Moment(`${data.release_date}`).format("DD.MM.YYYY")}
                    </div>
                    {genres.map((item) => (
                      <div style={genresStyle}> {`${item.name}`}</div>
                    ))}

                    <div className="mt-2">
                      <h4>Сюжет</h4>
                      {data.overview}
                    </div>
                  </Media.Body>
                </Media>
              </Col>
            </Row>
          </Container>
        </Fade>
      </>
    );
  }
}
