import { useReducer } from 'react'
import Axios from 'axios'
import MoviesContext from './moviesContext'
import MoviesReducer from './moviesReducer'
import { GET_MOVIES, SEARCH_MOVIES, GET_FEATURED_MOVIE, SET_SEARCH_TERM, SET_SORT, GET_MORE_MOVIES, GET_FAVORITE_MOVIES, ADD_FAVORITE_MOVIE, REMOVE_FAVORITE_MOVIE, SET_LOADING_MOVIES, SET_LOADING_FEATURED_MOVIE, SET_CATEGORY_FILTER, SET_COUNTRY_FILTER, RESET_COUNTRY_FILTER, RESET_CATEGORY_FILTER, RESET_SEARCH, SHOW_MOVIE, HIDE_MOVIE, SHOW_TRAILER, HIDE_TRAILER } from '../types'

const MoviesState = props => {
  const initialState = {
    movies: [],
    fav_movies: [],
    pages_loaded: 0,
    loading_movies: true,
    loading_featured_movie: true,
    loading_more: false,
    category_filter: null,
    country_filter: 'All',
    movies_loaded: 0,
    max_movies: null,
    sort: 'rating_desc',
    movie: null,
    featured_movie: null,
    show_trailer: false,
    search_term: null,
    search: false,
    display_fav_movies: false
  }

  const [state, dispatch] = useReducer(MoviesReducer, initialState)

  const getMovies = async (sort = state.sort, category_filter = state.category_filter, country_filter = state.country_filter) => {
    setLoadingMovies(true)
    try {
      let url = `https://moreas.pythonanywhere.com/movies/?sort=${sort}&category=${category_filter}&country=${country_filter}`
      const res = await Axios.get(url)
      const movies = res.data
      dispatch({
        type: GET_MOVIES,
        payload: { movies: movies, fav: false }
      })
    } catch (err) {
      console.log(err)
    }
    setLoadingMovies(false)
  }

  const getFavoriteMovies = async username => {
    setLoadingMovies(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const data = {
        username: username
      }
      let url = `https://moreas.pythonanywhere.com/favorite_movies/`
      const res = await Axios.post(url, data, config)
      const movies = res.data
      dispatch({
        type: GET_MOVIES,
        payload: { movies: movies, fav: true }
      })
    } catch (err) {
      console.log(err)
    }
    setLoadingMovies(false)
  }

  const getFeaturedMovie = async () => {
    try {
      let url = `https://moreas.pythonanywhere.com/featured_movie/`
      const res = await Axios.get(url)
      const movie = res.data
      dispatch({
        type: GET_FEATURED_MOVIE,
        payload: movie
      })
    } catch (err) {
      console.log(err)
    }
    setLoadingFeaturedMovie(false)
  }

  const getFavoriteMoviesList = async username => {
    console.log('FAVORITES')
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const data = {
        username: username
      }
      let url = `https://moreas.pythonanywhere.com/fav_movies_list/`
      const res = await Axios.post(url, data, config)
      const fav_movies = res.data.map(movie => movie.id)
      dispatch({
        type: GET_FAVORITE_MOVIES,
        payload: fav_movies
      })
    } catch (err) {
      console.log(err)
    }
  }

  const addFavorite = async (username, movie_id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const data = {
        username: username
      }
      let url = `https://moreas.pythonanywhere.com/fav_movie/${movie_id}`
      const res = await Axios.post(url, data, config)
      const fav_movies = res.data.map(movie => movie.id)
      dispatch({
        type: ADD_FAVORITE_MOVIE,
        payload: fav_movies
      })
      if (state.display_fav_movies === true) {
        getFavoriteMovies(username)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const removeFavorite = async (username, movie_id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const data = {
        username: username
      }
      let url = `https://moreas.pythonanywhere.com/unfav_movie/${movie_id}`
      const res = await Axios.post(url, data, config)
      const fav_movies = res.data.map(movie => movie.id)
      console.log(fav_movies)
      dispatch({
        type: REMOVE_FAVORITE_MOVIE,
        payload: fav_movies
      })
      if (state.display_fav_movies === true) {
        getFavoriteMovies(username)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const searchMovies = async text => {
    setSearchTerm(text)
    setLoadingMovies(true)
    try {
      let url = `https://moreas.pythonanywhere.com/search_movies/?text=${text}`
      const res = await Axios.get(url)
      const movies = res.data
      dispatch({
        type: SEARCH_MOVIES,
        payload: movies
      })
    } catch (err) {
      console.log(err)
    }
    setLoadingMovies(false)
  }

  const setSearchTerm = text => {
    dispatch({
      type: SET_SEARCH_TERM,
      payload: text
    })
  }

  const toggleRating = () => {
    if (state.sort === 'rating_desc') {
      dispatch({
        type: SET_SORT,
        payload: 'rating_asc'
      })
      getMovies('rating_asc', state.category_filter, state.country_filter)
    } else {
      dispatch({
        type: SET_SORT,
        payload: 'rating_desc'
      })
      getMovies('rating_desc', state.category_filter, state.country_filter)
    }
  }

  const toggleAlpha = () => {
    if (state.sort === 'alpha_asc') {
      dispatch({
        type: SET_SORT,
        payload: 'alpha_desc'
      })
      getMovies('alpha_desc', state.category_filter, state.country_filter)
    } else {
      dispatch({
        type: SET_SORT,
        payload: 'alpha_asc'
      })
      getMovies('alpha_asc', state.category_filter, state.country_filter)
    }
  }

  const toggleDate = () => {
    if (state.sort === 'date_asc') {
      dispatch({
        type: SET_SORT,
        payload: 'date_desc'
      })
      getMovies('date_desc', state.category_filter, state.country_filter)
    } else {
      dispatch({
        type: SET_SORT,
        payload: 'date_asc'
      })
      getMovies('date_asc', state.category_filter, state.country_filter)
    }
  }
  const getMoreMovies = async () => {
    setLoadingMovies(true)
    try {
      if (state.search === true) {
        console.log('less')
        let url = `https://moreas.pythonanywhere.com/search_movies/?page=${state.pages_loaded + 1}&text=${state.search_term}`
        const res = await Axios.get(url)
        const movies = res.data
        dispatch({
          type: GET_MORE_MOVIES,
          payload: { movies: movies.results, pages_loaded: state.pages_loaded + 1, max: movies.count }
        })
      } else {
        console.log('more')
        let url = `https://moreas.pythonanywhere.com/movies/?page=${state.pages_loaded + 1}&sort=${state.sort}&category=${state.category_filter}&country=${state.country_filter}`
        const res = await Axios.get(url)
        const movies = res.data
        dispatch({
          type: GET_MORE_MOVIES,
          payload: { movies: movies.results, pages_loaded: state.pages_loaded + 1, max: movies.count }
        })
      }
    } catch (err) {
      console.log(err)
    }
    setLoadingMovies(false)
  }

  const setCategoryFilter = name => {
    dispatch({
      type: SET_CATEGORY_FILTER,
      payload: name
    })
    getMovies('rating_desc', name, state.country_filter)
  }

  const reset_category = () => {
    dispatch({
      type: RESET_CATEGORY_FILTER
    })
    getMovies('rating_desc', null, state.country_filter)
  }

  const setCountryFilter = name => {
    dispatch({
      type: SET_COUNTRY_FILTER,
      payload: name
    })
    getMovies('rating_desc', null, name)
  }

  const reset_country = () => {
    dispatch({
      type: RESET_COUNTRY_FILTER
    })
    getMovies('rating_desc', state.category_filter, 'All')
  }

  const reset_search = () => {
    dispatch({
      type: RESET_SEARCH
    })
    getMovies('rating_desc', state.category_filter, 'All')
  }

  const setLoadingMovies = bool => {
    dispatch({
      type: SET_LOADING_MOVIES,
      payload: bool
    })
  }

  const setLoadingFeaturedMovie = bool => {
    dispatch({
      type: SET_LOADING_FEATURED_MOVIE,
      payload: bool
    })
  }

  const showMovie = async id => {
    try {
      let url = `https://moreas.pythonanywhere.com/movie/${id}`
      const res = await Axios.get(url)
      const movie = res.data
      dispatch({
        type: SHOW_MOVIE,
        payload: movie
      })
    } catch (err) {
      console.log(err)
    }
  }

  const hideMovie = () => {
    dispatch({
      type: HIDE_MOVIE
    })
  }

  const showTrailer = () => {
    dispatch({
      type: SHOW_TRAILER
    })
  }

  const hideTrailer = () => {
    dispatch({
      type: HIDE_TRAILER
    })
  }

  return <MoviesContext.Provider value={{ getMovies, searchMovies, getFavoriteMovies, getFavoriteMoviesList, addFavorite, removeFavorite, toggleRating, toggleDate, toggleAlpha, getMoreMovies, setCategoryFilter, setCountryFilter, reset_country, reset_category, showMovie, hideMovie, showTrailer, hideTrailer, reset_search, getFeaturedMovie, movie: state.movie, featured_movie: state.featured_movie, movies: state.movies, fav_movies: state.fav_movies, loading_movies: state.loading_movies, loading_featured_movie: state.loading_featured_movie, sort: state.sort, category_filter: state.category_filter, country_filter: state.country_filter, max_movies: state.max_movies, movies_loaded: state.movies_loaded, show_trailer: state.show_trailer, search_term: state.search_term, display_fav_movies: state.display_fav_movies }}>{props.children}</MoviesContext.Provider>
}

export default MoviesState
