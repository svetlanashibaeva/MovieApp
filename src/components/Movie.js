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
};

const boxStyles = {
  backgroundColor: "#28a745",
  padding: "2px 5px",
  position: "absolute",
  color: "#ffffff",
};

const cardTitle = {
  fontSize: "15px",
  fontWeight: "bold",
};

const imgSize = {
    height: '400px',
    width: '100%'
}


const Movie = (props) => {
    const img = props.item.poster_path == null ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg' : `https://image.tmdb.org/t/p/w220_and_h330_face/${props.item.poster_path}`
  return (
    <>
      <Card style={cardStyles} movieID={props.item.id}>
        <CardActionArea>
          <Box component="span" m={1} style={boxStyles}>
            {props.item.vote_average}
          </Box>
        <Link to={`/movie/${props.item.id}`} style={{color: '#000'}}>
          <CardMedia
            component="img"
            image= {img}
            style={imgSize}
          />

          <CardContent>
            <Typography key={props.item.name} style={cardTitle}>
              {props.item.title}
            </Typography>
            
            <Typography component="p">
              {Moment(`${props.item.release_date}`).format("DD.MM.YYYY")}
            </Typography>
            
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      
    </>
  );
};

export default Movie;