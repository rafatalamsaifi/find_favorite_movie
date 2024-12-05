import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "./Context";
import { Grid, Card, Typography } from "@mui/material";

const Movies = () => {
  const { movie, isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <Grid container>
        <Grid item>Loading...</Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} sx={{ px: 10 }}>
      {movie.map((currentMovie) => {
        const { imdbID, Poster, Title } = currentMovie;
        let movieName = Title.substring(0, 20);
        movieName = movieName.length >= 20 ? `${movieName}...` : movieName;
        return (
          <NavLink to={`movie/${imdbID}`} key={imdbID}>
            <Grid item p={2} maxWidth="100%">
              <Card sx={{ p: "10px" }}>
                <Typography variant="h5">{movieName}</Typography>
                <img src={Poster} alt={imdbID} sx={{ maxWidth: 200, p: 2 }} />
              </Card>
            </Grid>
          </NavLink>
        );
      })}
    </Grid>
  );
};

export default Movies;
