import React, { useContext } from "react";
import MovieItem from "./MovieItem";
import Spinner from "../layout/Spinner";
import MovieContext from "../../context/movies/movieContext";

const Movies = () => {
  const movieContext = useContext(MovieContext);

  const { loading, movies } = movieContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
};

export default Movies;
