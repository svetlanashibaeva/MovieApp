import React, { Component } from "react";
import { Container, Row, Col, Media } from "react-bootstrap";
import ApiService from "../service/ApiService";
import { Link } from "react-router-dom";
import Moment from "moment";
import { Box } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Grid } from "@material-ui/core";
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';
import "../assets/style.css";

const boxStyles = {
  backgroundColor: "#28a745",
  padding: "2px 5px",
  position: "absolute",
  color: "#ffffff",
};

const genresStyleLi = {
  display: "inline-block",
  color: "#fff",
  backgroundColor: "#28a745",
  padding: "2px 5px",
  marginRight: "5px",
  marginTop: "3px"
};

const genresStyleUl = {
  listStyle: "none",
  padding: "0px",
  marginTop: "10px",
};

const back = {
  backgroundColor: "#28a745",
  padding: "5px 10px",
  color: "#fff"
};

const actorName = {
  fontWeight: "bold",
  fontSize: "12px",
  color: "#fff"
};

const characterName = {
  fontSize: "10px",
  color: "#fff"
};


export default class MovieItem extends Component {
  apiService = new ApiService();

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      movieId: props.movieId,
      data: {},
      genres: [],
      cast: [],
      showMore: false,
      videos: []
    };
  }

  showMovieInfo() {
    this.apiService
      .showMovieInfo(this.state.movieId)
      .then((data) => {
        this.apiService
          .showMovieInfo(this.state.movieId, "/credits")
          .then((credits) => {
            this.apiService
            .showMovieInfo(this.state.movieId, "/videos")
            .then((videos) => {
              this.setState({
                cast: credits.cast,
                isLoaded: true,
                data: data,
                genres: data.genres,
                videos: videos.results
              });
            });
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
    const { data, genres, cast, videos } = this.state;

    if (this.state.error) {
      return <ErrorMessage/>
    }

    if (!this.state.isLoaded) {
      return <Spinner/>
    }


    return (
      <>
        <Fade>
          <Container style={{ margin: "20px auto" }}>
            <Link
              to="/"
              style={back}
              onClick={() => {
                document.getElementById("searchForm").value = "";
              }}
            >
              {" "}
              ← На главную{" "}
            </Link>
            <Row style={{ marginTop: "20px" }}>
              <Col xs={12} sm={12} lg={4}>
                <Box component="span" m={1} style={boxStyles}>
                  {data.vote_average}
                </Box>
                <Media>
                  <img
                    height="450px"
                    className="mr-3"
                    src={data.poster_path==null ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg' : `https://image.tmdb.org/t/p/w300///${data.poster_path}`}
                    alt={data.title}
                  />
                </Media>
              </Col>
              <Col xs={12} sm={12} lg={8}>
                <Media>
                  <Media.Body>
                    <h2> {data.title} </h2>
                    <div>
                      <b>Дата релиза:</b>{" "}
                      {Moment(`${data.release_date}`).format("DD.MM.YYYY")}
                    </div>
                    <ul style={genresStyleUl}>
                      {genres.map((item) => (
                        <li style={genresStyleLi}>{`${item.name}`} &nbsp;</li>
                      ))}
                    </ul>
                    <div className="mt-2">
                      <div>
                        <b>Сюжет</b>
                      </div>
                      {data.overview}
                    </div>
                    {videos.length != 0 ?
                    <div className="mt-3 frame_blc">
                      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videos[0].key}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div> : ""}
                    <div className="mt-2">
                      <b>В главных ролях:</b>
                    </div>
                    <Grid container spacing={3}>
                      {cast
                        .slice(0, this.state.showMore ? cast.length : 6)
                        .map((item) => (
                          <Grid item xs={4} md={2} sm={3} className="mt-2 mb-3">
                          <Link to={`/person/${item.id}`} style={{color: '#000'}} onClick={() => {window.scrollTo(0, 0)}}>
                            <Media>
                              <img
                                height="150px"
                                width="100px"
                                src={
                                  item.profile_path == null
                                    ? "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
                                    : `https://image.tmdb.org/t/p/w185///${item.profile_path}`
                                }
                                alt={`${item.name}`}
                              />
                            </Media>
                            <div style={actorName}>{`${item.name}`} &nbsp;</div>
                            <div style={characterName}>
                              {`${item.character}`} &nbsp;
                            </div></Link>
                          </Grid>
                        ))}
                    </Grid>
                    <Link
                      style={back}
                      onClick={() => {
                        this.setState({ showMore: !this.state.showMore });
                      }}
                    >
                      {this.state.showMore ? "Свернуть" : "Показать еще"}
                    </Link>
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
