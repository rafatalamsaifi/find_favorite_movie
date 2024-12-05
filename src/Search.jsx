import React from "react";
import { useGlobalContext } from "./Context";
import { Container, Typography, TextField } from "@mui/material";

const Search = () => {
  const { query, setQuery, isError } = useGlobalContext();

  return (
    <>
      <Container  style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}>
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <Typography style={{ fontWeight: "bold", marginBottom: "10px" }}>FIND YOUR FAVOURITE MOVIE</Typography>
          <TextField
            type="text"
            variant="outlined"
            label="search here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <Typography variant="h6" style={{ color: "red", marginTop: "10px" }}>
          {isError.show && isError.msg}
        </Typography>
      </Container>
    </>
  );
};

export default Search;
