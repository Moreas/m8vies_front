import { useEffect, useContext } from 'react'
import Spinner from './Spinner'
import MoviesContext from '../context/movies/moviesContext'

function FeaturedMovie() {
  const moviesContext = useContext(MoviesContext)
  const { getFeaturedMovie, featured_movie, loading_featured_movie, showMovie } = moviesContext
  const clickMovie = () => {
    showMovie(featured_movie.id)
  }
  useEffect(() => {
    let unmounted = false
    if (!unmounted) {
      getFeaturedMovie()
    }
    return () => {
      unmounted = true
    }
    // eslint-disable-next-line
  }, [])
  const hide = () => {
    document.querySelector('.featured-movie').classList.toggle('featured-hidden')

    if (document.querySelector('#hfm').innerText === 'Show Featured Movie') {
      document.querySelector('#hfm').innerText = 'Hide Featured Movie'
    } else {
      document.querySelector('#hfm').innerText = 'Show Featured Movie'
    }
  }
  if (loading_featured_movie) {
    return <Spinner />
  } else {
    return (
      <div className='featured-movie'>
        <img className='featured-cover' src={`https://image.tmdb.org/t/p/w1280/${featured_movie.backdrop_url}`} alt='' />
        <p className='corner-title'>Featured</p>

        <div className='bottom-bar'>
          <div className='title-container' onClick={clickMovie}>
            <i className='fa fa-play-circle'></i>
            <b>{featured_movie.title}</b>
          </div>
          <div className='right' onClick={hide}>
            <div className='hide-feature-movie'>
              <i className='fa fa-eye-slash'></i> <span id='hfm'>Hide Featured Movie</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeaturedMovie
