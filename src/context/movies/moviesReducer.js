import { GET_MOVIES, SEARCH_MOVIES, GET_FEATURED_MOVIE, GET_FAVORITE_MOVIES, ADD_FAVORITE_MOVIE, REMOVE_FAVORITE_MOVIE, SET_SEARCH_TERM, SET_SORT, GET_MORE_MOVIES, SET_LOADING_MOVIES, SET_LOADING_FEATURED_MOVIE, SET_CATEGORY_FILTER, SET_COUNTRY_FILTER, RESET_COUNTRY_FILTER, RESET_CATEGORY_FILTER, RESET_SEARCH, SHOW_MOVIE, HIDE_MOVIE, SHOW_TRAILER, HIDE_TRAILER } from '../types'

const MoviesReducer = (state, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        pages_loaded: 1,
        movies: action.payload.movies.results,
        display_fav_movies: action.payload.fav,
        movies_loaded: action.payload.movies.results.length,
        max_movies: action.payload.movies.count,
        search: false,
        search_term: null
      }
    case GET_FAVORITE_MOVIES:
      return {
        ...state,
        fav_movies: action.payload,
        country_filter: 'All',
        category_filter: null
      }
    case SEARCH_MOVIES:
      return {
        ...state,
        pages_loaded: 1,
        movies: action.payload.results,
        display_fav_movies: false,
        movies_loaded: action.payload.results.length,
        max_movies: action.payload.count,
        category_filter: null,
        country_filter: 'All',
        search: true
      }
    case GET_FEATURED_MOVIE:
      return {
        ...state,
        featured_movie: action.payload
      }
    case ADD_FAVORITE_MOVIE:
      return {
        ...state,
        fav_movies: action.payload
      }
    case REMOVE_FAVORITE_MOVIE:
      return {
        ...state,
        fav_movies: action.payload
      }
    case SET_SEARCH_TERM:
      return {
        ...state,
        search_term: action.payload
      }
    case RESET_SEARCH:
      return {
        ...state,
        search_term: null,
        search: false
      }
    case SET_SORT:
      return {
        ...state,
        pages_loaded: 0,
        sort: action.payload
      }
    case SET_CATEGORY_FILTER:
      return {
        ...state,
        category_filter: action.payload,
        sort: 'rating_desc'
      }
    case RESET_CATEGORY_FILTER:
      return {
        ...state,
        category_filter: null
      }
    case SET_COUNTRY_FILTER:
      return {
        ...state,
        category_filter: null,
        country_filter: action.payload,
        sort: 'rating_desc'
      }
    case RESET_COUNTRY_FILTER:
      return {
        ...state,
        country_filter: 'All'
      }
    case GET_MORE_MOVIES:
      return {
        ...state,
        pages_loaded: action.payload.pages_loaded,
        movies: state.movies.concat(action.payload.movies),
        movies_loaded: state.movies_loaded + action.payload.movies.length,
        max_movies: action.payload.max
      }
    case SET_LOADING_MOVIES:
      return {
        ...state,
        loading_movies: action.payload
      }
    case SET_LOADING_FEATURED_MOVIE:
      return {
        ...state,
        loading_featured_movie: action.payload
      }
    case SHOW_MOVIE:
      return {
        ...state,
        movie: action.payload
      }
    case HIDE_MOVIE:
      return {
        ...state,
        movie: null
      }
    case SHOW_TRAILER:
      return {
        ...state,
        show_trailer: true
      }
    case HIDE_TRAILER:
      return {
        ...state,
        show_trailer: false
      }
    default:
      return state
  }
}

export default MoviesReducer
