import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoviesContext from '../context/movies/moviesContext'
import UserContext from '../context/user/userContext'

function MovieCard() {
  const moviesContext = useContext(MoviesContext)
  const { movie, hideMovie, showTrailer, hideTrailer, show_trailer, addFavorite, removeFavorite, fav_movies } = moviesContext
  const userContext = useContext(UserContext)
  const { authenticated, profile } = userContext
  const clickModal = () => {
    hideMovie()
    hideTrailer()
  }
  const clickShowTrailer = () => {
    showTrailer()
  }
  const clickHideTrailer = () => {
    hideTrailer()
  }

  const clickFavorite = () => {
    if (fav_movies.includes(movie.id)) {
      removeFavorite(profile.username, movie.id)
    } else {
      addFavorite(profile.username, movie.id)
    }
  }

  useEffect(() => {
    movie && styleRating(movie.vote_average)
  }, [movie])

  const styleRating = vote_average => {
    const ratings = document.querySelectorAll('.rating')
    let score = 10 * vote_average
    ratings.forEach(rating => {
      const scoreClass = score < 50 ? 'bad' : score < 75 ? 'meh' : 'good'
      rating.classList.add(scoreClass)
      const ratingColor = window.getComputedStyle(rating).backgroundColor
      rating.setAttribute('style', `background: conic-gradient(${ratingColor} ${score}%, transparent 0 100%)`)
    })
  }

  const renderTrailer = () => {
    if (show_trailer) {
      return (
        <div className='youtube-overlay'>
          <iframe className='youtube' width='560' height='315' src={`https://www.youtube.com/embed/${movie.trailer_key}?rel=0&autoplay=1`} title='YouTube video player' modestbranding='1' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
          <div className='youtube-title'>{movie.title}</div>
          <div className='youtube-close'>
            <i className='fas fa-times-circle' onClick={clickHideTrailer}></i>
          </div>
        </div>
      )
    }
  }

  if (movie) {
    return (
      <>
        <div className='modal-overlay' onClick={clickModal}></div>
        <div className='card'>
          <div className='card_left'>
            <img src={movie.poster_url_large} alt='' />
          </div>
          <div className='card_right'>
            <div className='close' onClick={clickModal}>
              <i className='fas fa-times'></i>
            </div>
            <h1>{movie.title}</h1>
            {authenticated && (
              <div className='card_right__fav' onClick={clickFavorite}>
                {fav_movies.includes(movie.id) ? (
                  <>
                    <i className='fas fa-heart' />
                    <span> Remove from favorite movies</span>
                  </>
                ) : (
                  <>
                    <i className='far fa-heart' />
                    <span> Add to favorite movies</span>
                  </>
                )}
              </div>
            )}
            <div className='card_right__details'>
              <ul>
                <li>{movie.year}</li>
                <li>{movie.duration} min</li>
                <li>{movie.genres_list}</li>
              </ul>
              <div className='card_right__review'>
                <p>{movie.overview}</p>
                <a href={`https://www.themoviedb.org/movie/${movie.tmdb_id}`} target='_blank' rel='noreferrer'>
                  Read more
                </a>
              </div>
              <div className='card_right__button'>
                <Link to='#' onClick={clickShowTrailer}>
                  WATCH TRAILER
                </Link>
                {renderTrailer()}
              </div>
              <div className='rating' title='rating'>
                <span>{movie.vote_average * 10}%</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return <></>
  }
}

export default MovieCard
