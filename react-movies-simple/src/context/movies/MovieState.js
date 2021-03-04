import React, { useReducer } from "react";
import axios from "axios";
import MovieContext from "./movieContext";
import MovieReducer from "./movieReducer";
import {
  SEARCH_MOVIES,
  SET_LOADING,
  CLEAR_MOVIES,
  GET_MOVIE,
  GET_REVIEWS,
} from "../types";

const MovieState = (props) => {
  const initialState = {
    movies: [],
    movie: {},
    reviews: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(MovieReducer, initialState);

  // Search Movies
  const searchMovies = async (text) => {
    setLoading();
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=da28ea80576fc0af9b22a9958109445b&query=${text}`
    );

    dispatch({
      type: SEARCH_MOVIES,
      payload: res.data.results,
    });
  };

  // Get Movie info
  const getMovie = async (movie_id) => {
    setLoading();
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=da28ea80576fc0af9b22a9958109445b&language=en-US
    `);

    dispatch({ type: GET_MOVIE, payload: res.data });
  };

  // Get Reviews
  const getMovieReviews = async (movie_id) => {
    setLoading();
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=da28ea80576fc0af9b22a9958109445b&language=en-US
    `);

    dispatch({ type: GET_REVIEWS, payload: res.data.results });
  };

  // Clear Movies
  const clearMovies = () => dispatch({ type: CLEAR_MOVIES });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        movie: state.movie,
        reviews: state.reviews,
        loading: state.loading,
        searchMovies,
        clearMovies,
        getMovie,
        getMovieReviews,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
