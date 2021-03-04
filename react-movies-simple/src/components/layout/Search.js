import React, { useState, useContext } from "react";
import MovieContext from "../../context/movies/movieContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const movieContext = useContext(MovieContext);
  const alertContext = useContext(AlertContext);

  const { searchMovies, movies, clearMovies } = movieContext;
  const { setAlert } = alertContext;

  const [text, setText] = useState("");

  // Update the state when submitting the search
  const onSubmit = (e) => {
    if (text === "") {
      e.preventDefault();
      setAlert("Please enter a movie title", "danger");
    } else {
      e.preventDefault();
      searchMovies(text);
      setText("");
    }
  };

  // Tracking input in search
  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="row mt-3">
      <div className="col-12">
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="text"
              placeholder="Search a movie title..."
              className="form-control w-100 offset md-6 mb-2"
              value={text}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-block bg-info text-light"
              value="Search"
              onSubmit={onSubmit}
            />
          </div>
          {movies.length > 0 && (
            <button
              type="submit"
              value="Clear"
              className="btn btn-block bg-dark text-light"
              onClick={clearMovies}
            >
              Clear
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Search;
