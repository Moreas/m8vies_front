import { useContext } from 'react'
import { Link } from 'react-router-dom'
import MoviesContext from '../context/movies/moviesContext'
import Spinner from './Spinner'

function LoadMore() {
  const moviesContext = useContext(MoviesContext)
  const { getMoreMovies, max_movies, movies_loaded, loading_movies } = moviesContext
  if (loading_movies) {
    return <Spinner />
  } else {
    if (max_movies > movies_loaded) {
      return (
        <Link to='#' className='load-more' onClick={getMoreMovies}>
          Show other movies ({max_movies - movies_loaded} more) <span className='fa fa-plus'> </span>
        </Link>
      )
    } else {
      return (
        <center>
          <p>... All movies loaded ({max_movies}) ...</p>
        </center>
      )
    }
  }
}

export default LoadMore
