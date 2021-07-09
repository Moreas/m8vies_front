import { useContext } from 'react'
import MoviesContext from '../context/movies/moviesContext'

function MovieItem({ poster_url, title, genre, id }) {
  const moviesContext = useContext(MoviesContext)
  const { showMovie } = moviesContext

  const clickMovie = () => {
    showMovie(id)
  }
  return (
    <li onClick={clickMovie}>
      <img src={poster_url} alt='' className='cover' />
      <p title={title} className='title'>
        {title}
      </p>
      <p title={genre} className='genre'>
        {genre}
      </p>
    </li>
  )
}

export default MovieItem
