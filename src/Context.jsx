import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

export const API_URL = `https://www.omdbapi.com/?&apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("titanic");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const myData = response.data;
      console.log(myData);
      if (myData.Response === "True" && myData.Search) {
        setIsLoading(false);
        setIsError({ show: false, msg: "" });
        setMovie(myData.Search);
      } else {
        setIsError({ show: true, msg: myData.Error });
      }
      console.log(myData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      // if (query) {
      getMovies(`${API_URL}&s=${query}`);
      // }
    }, 800);
    return () => clearTimeout(timerOut);
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, movie, isError, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
