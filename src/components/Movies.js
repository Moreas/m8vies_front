import { useEffect, useContext } from 'react'
import MovieItem from './MovieItem'
import LoadMore from './LoadMore'
import Sortbar from './Sortbar'
import Spinner from './Spinner'
import MoviesContext from '../context/movies/moviesContext'

function Movies() {
  const moviesContext = useContext(MoviesContext)
  const { getMovies, movies, loading_movies } = moviesContext

  useEffect(() => {
    let unmounted = false
    if (!unmounted) {
      getMovies()
    }
    return () => {
      unmounted = true
    }
    // eslint-disable-next-line
  }, [])

  if (loading_movies) {
    return <Spinner />
  } else {
    return (
      <div className='movie-list'>
        <Sortbar />
        <ul className='list'>
          {movies.map(movie => (
            <MovieItem key={movie.id} id={movie.id} poster_url={movie.poster_url_small} title={movie.title} genre={movie.genres_list} />
          ))}
        </ul>
        <LoadMore />
      </div>
    )
  }
}

export default Movies
