import {
  SEARCH_MOVIES,
  SET_LOADING,
  CLEAR_MOVIES,
  GET_MOVIE,
  GET_REVIEWS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };

    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };

    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case CLEAR_MOVIES:
      return {
        ...state,
        movies: [],
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
