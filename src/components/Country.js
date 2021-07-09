import { useContext } from 'react'
import { Link } from 'react-router-dom'
import MoviesContext from '../context/movies/moviesContext'

function Country({ name }) {
  const moviesContext = useContext(MoviesContext)
  const { setCountryFilter, country_filter } = moviesContext

  const clickCountry = () => {
    setCountryFilter(name)
  }

  return (
    <Link className={country_filter.toUpperCase() === name.toUpperCase() ? 'active' : ''} to='#' onClick={clickCountry}>
      <div className='menu-item'>{name} Movies</div>
    </Link>
  )
}

export default Country
