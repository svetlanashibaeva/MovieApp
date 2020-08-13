import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
} from "@material-ui/core";
import Moment from "moment";
import { Link } from "react-router-dom";

const cardStyles = {
  height: "420",
  borderRadius: "0%",
  border: "0px",
  boxShadow: "none",
  background: "#252525"
};

const boxStyles = {
  backgroundColor: "#28a745",
  padding: "2px 5px",
  position: "absolute",
  color: "#ffffff",
  boxShadow: '0 0 10px rgba(0,0,0,0.5)'
};

const cardTitle = {
  fontSize: "15px",
  fontWeight: "bold",
  color: "#fff"
};


const Movie = (props) => {
    const img = props.item.poster_path == null ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg' : `https://image.tmdb.org/t/p/w300///${props.item.poster_path}`
  return (
    <>
      <Card style={cardStyles} movieID={props.item.id}>
        <CardActionArea>
          <Box component="span" m={1} style={boxStyles}>
            {props.item.vote_average}
          </Box>
        <Link to={`/movie/${props.item.id}`} style={{color: '#000'}} onClick={() => {window.scrollTo(0, 0)}}>
          <CardMedia
            component="img"
            image= {img}
            alt={props.item.title}
            height = "400px"
          />

          <CardContent>
            <Typography key={props.item.name} style={cardTitle}>
              {props.item.title}
            </Typography>
            
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      
    </>
  );
};

export default Movie;
