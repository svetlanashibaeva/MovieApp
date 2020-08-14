import React, { Component } from "react";
import { Container, Row, Col, Media, Image } from "react-bootstrap";
import ApiService from "../service/ApiService";
import { Link } from "react-router-dom";
import Moment from "moment";
import Fade from "react-reveal/Fade";
import { Grid } from "@material-ui/core";
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

const back = {
  backgroundColor: "#28a745",
  padding: "5px 10px",
  color: "#fff",
};

export default class CharItem extends Component {
  apiService = new ApiService();

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      charID: props.charID,
      data: {},
      images: [],
      profilePath: ''
    };
  }

  personInfo() {
    this.apiService
      .personInfo(this.state.charID)
      .then((data) => {
        this.apiService
          .personInfo(this.state.charID, "/images")
          .then((images) => {
            this.setState({
              isLoaded: true,
              data: data,
              images: images.profiles,
              profilePath: data.profile_path
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
    this.personInfo();
  }

  render() {
    const { data, images, profilePath} = this.state;

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
                <Media>
                  <img
                    height="450px"
                    className="mr-3"
                    src={
                      data.profile_path == null
                        ? "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
                        : `https://image.tmdb.org/t/p/w300///${profilePath}`
                    }
                    alt={data.name}
                  />
                </Media>
              </Col>
              <Col xs={12} sm={12} lg={8}>
                <Media>
                  <Media.Body>
                    <h2> {data.name} </h2>
                    <div>
                      <b>Дата рождения:</b>{" "}
                      {Moment(`${data.birthday}`).format("DD.MM.YYYY")}
                    </div>
                    <div className="mt-2">
                      <b>Место рождения:</b> {data.place_of_birth}
                    </div>
                    <div className="mt-2">
                      <div>
                        <b>Биография</b>
                      </div>
                      {data.biography}
                    </div>
                  </Media.Body>
                </Media>

                <div className="mt-2">
                  <b>Фотографии</b>
                </div>
                <Grid container spacing={3}>
                  {images.slice(0, 6).map((image) => (
                    <Grid item xs={4} md={2} sm={3} className="mt-2 mb-3">
                      <Image
                        src={`https://image.tmdb.org/t/p/w185///${image.file_path}`}
                        width="100px"
                        onClick={() => {this.setState({profilePath: image.file_path})}}
                        style={{cursor: 'pointer'}}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Col>
            </Row>
          </Container>
        </Fade>
      </>
    );
  }
}
