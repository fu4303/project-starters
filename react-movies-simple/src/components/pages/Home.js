import React from 'react';
import TrendingMovies from '../movies/TrendingMovies';
import PopularMovies from '../movies/PopularMovies';
import LatestMovies from '../movies/LatestMovies';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Home = ({ trending = [], popular = [], topRated = [] }) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Trending</Tab>
        <Tab>Popular</Tab>
        <Tab>Top Rated</Tab>
      </TabList>
      <TabPanel>
        <div className='mt-3'>
          <div className='tab-movies-container'>
            {trending.map((trendingMovie) => (
              <TrendingMovies
                key={trendingMovie.id}
                trendingMovie={trendingMovie}
              />
            ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <div className='tab-movies-container'>
          {popular.map((popularMovie) => (
            <PopularMovies key={popularMovie.id} popularMovie={popularMovie} />
          ))}
        </div>
      </TabPanel>
      <TabPanel>
        <div className='tab-movies-container'>
          {topRated.map((topRatedMovie) => (
            <LatestMovies
              key={topRatedMovie.id}
              topRatedMovie={topRatedMovie}
            />
          ))}
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default Home;
