import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie: { title, id, poster_path, release_date } }) => {
  return (
    <div className='card-group'>
      <div className='card text-center d-flex align-items-center justify-content-between h-100'>
        <Link to={`/movie/${id}`}>
          <div className='card-img-top'>
            {poster_path == null ? (
              <img
                src='https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'
                alt='poster-icon'
                style={{ width: '100%' }}
              />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w185/${poster_path}
          `}
                alt='poster-icon'
              />
            )}
          </div>
          <div className='card-body d-flex align-items-center justify-content-center'>
            <span className='card-title m-0'>{title}</span>
          </div>
        </Link>
        <div className='card-footer d-flex w-100 align-items-center justify-content-center'>
          {release_date ? (
            <p className='mb-0'>{release_date}</p>
          ) : (
            <p className='mb-0'>No Date</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
