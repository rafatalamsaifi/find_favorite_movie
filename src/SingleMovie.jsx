import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "./Context";
import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";

const SingleMovie = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  const getMovies = async (url) => {
    try {
      const response = await axios.get(url);
      const myData = response.data;
      console.log(myData);
      if (myData.Response === "True") {
        setIsLoading(false);
        setMovie(myData);
      }
      console.log(myData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      // if (query) {
      getMovies(`${API_URL}&i=${id}`);
      // }
    }, 800);
    return () => clearTimeout(timerOut);
  }, [id]);

  if (isLoading) {
    return (
      <Grid container>
        <Grid item>Loading...</Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item>
        <img src={movie.Poster} alt="No id" />
        <Typography variant="h4">{movie.Title}</Typography>
        <Typography variant="p">{movie.imdbRating}</Typography>
        <Typography variant="p">{movie.Genre}</Typography>
        <NavLink to="/">
          <Button variant="contained">Go Back</Button>
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default SingleMovie;
