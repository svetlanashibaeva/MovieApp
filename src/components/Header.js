import React, { Component } from "react";
import "./style.css";
import { Container } from "react-bootstrap";
import { Form, FormControl, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const pT = {
  margin: "0",
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
};

const searchStyle = {
  border: "none",
  borderRadius: "0",
  width: "65%",
};

const btnClear = {
  border: "none",
  borderRadius: "0",
  backgroundColor: "#28a745",
  height: "calc(1.5em + .75rem + 2px)",
};

class Header extends Component {
  handleChange = (e) => {
    this.props.history.push(`/search/${e.target.value}`);
  };

  clearSearch = () => {
    document.getElementById("searchForm").value = "";
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="header-bg">
        <Container>
          <div style={pT}>
            <h1 className="header-title">Миллион фильмов и сериалов</h1>
            <h3 className="header-subtitle">
              найдите тот, который будете смотреть сейчас:
            </h3>
            <Form inline>
              <FormControl
                type="text"
                placeholder="найти фильм, сериал"
                className="form-control"
                style={searchStyle}
                onChange={this.handleChange}
                id="searchForm"
              />
              <Button onClick={this.clearSearch} style={btnClear}>
                ×
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(Header);
