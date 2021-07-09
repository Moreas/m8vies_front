import { useContext } from 'react'
import { Link } from 'react-router-dom'
import MoviesContext from '../context/movies/moviesContext'

function Sortbar() {
  const moviesContext = useContext(MoviesContext)
  const { sort, toggleRating, toggleDate, toggleAlpha, category_filter, country_filter, reset_country, reset_category, search_term, reset_search, display_fav_movies } = moviesContext

  const clickResetCountry = () => {
    reset_country()
  }

  const clickResetCategory = () => {
    reset_category()
  }

  const clickResetSearch = () => {
    reset_search()
  }

  const sortBarFilters = () => {
    if (display_fav_movies) {
      return (
        <>
          <>Your favorite movies</>
        </>
      )
    } else {
      if (search_term === null) {
        return (
          <>
            <p className='bold'>
              {country_filter === 'All' ? 'All' : country_filter} Movies {country_filter !== 'All' && <i className='fa fa-window-close' onClick={clickResetCountry}></i>}
            </p>
            <p className='grey'>
              {category_filter ? category_filter : 'all categories'} {category_filter && <i className='fa fa-window-close' onClick={clickResetCategory}></i>}
            </p>
          </>
        )
      } else {
        return (
          <>
            <p className='bold'>Search Results :</p>
            <p className='grey'>
              {search_term} <i className='fa fa-window-close' onClick={clickResetSearch}></i>
            </p>
          </>
        )
      }
    }
  }

  const sortBarSorting = () => {
    return (
      <>
        <Link className={`${sort.includes('rating') && 'black'}`} to='#' onClick={toggleRating}>
          Rating <i className={`fa ${sort === 'rating_desc' ? 'fa-angle-down' : sort === 'rating_asc' && 'fa-angle-up'}`}></i>
        </Link>
        <Link className={`${sort.includes('date') && 'black'}`} to='#' onClick={toggleDate}>
          {sort === 'date_asc' ? 'Newest' : 'Oldest'}
        </Link>
        <Link className={`${sort.includes('alpha') ? 'black' : ''}`} to='#' onClick={toggleAlpha}>
          {sort === 'alpha_desc' ? 'Z-A' : 'A-Z'}
        </Link>
      </>
    )
  }
  return (
    <div className='title-bar'>
      <div className='left'>{sortBarFilters()}</div>
      <div className='right'>{display_fav_movies || sortBarSorting()}</div>
    </div>
  )
}

export default Sortbar
