import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import MovieDetails from './components/movies/MovieDetails';
import About from './components/pages/About';
import SearchMovies from './components/pages/SearchMovies';
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';

import axios from 'axios';

import MovieState from './context/movies/MovieState';
import AlertState from './context/alert/AlertState';

import './App.scss';

const App = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    // Trending Movies
    const getTrendingMovies = async () => {
      const res = await axios.get(
        'https://api.themoviedb.org/3/trending/movie/week?api_key=da28ea80576fc0af9b22a9958109445b'
      );
      setTrending(res.data.results);
    };
    // Popular Movies
    const getPopularMovies = async () => {
      const res = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=da28ea80576fc0af9b22a9958109445b&language=en-US&page=1'
      );
      setPopular(res.data.results);
    };
    // Latest Movies
    const getTopRatedMovies = async () => {
      const res = await axios.get(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=da28ea80576fc0af9b22a9958109445b&language=en-US&page=1'
      );
      setTopRated(res.data.results);
    };

    getTrendingMovies();
    getPopularMovies();
    getTopRatedMovies();
    // eslint-disable-next-line
  }, []);

  return (
    <MovieState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route
                  exact
                  path='/'
                  render={(props) => (
                    <Home
                      trending={trending}
                      popular={popular}
                      topRated={topRated}
                    />
                  )}
                />
                <Route exact path='/search' component={SearchMovies} />
                <Route exact path='/about' component={About} />
                <Route exact path='/movie/:id' component={MovieDetails} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </MovieState>
  );
};

export default App;
