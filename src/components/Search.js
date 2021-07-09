import { useContext, useEffect } from 'react'
import MoviesContext from '../context/movies/moviesContext'
function Search() {
  const moviesContext = useContext(MoviesContext)
  const { searchMovies } = moviesContext

  const getSearch = () => {
    const search_input = document.querySelector('#search')
    searchMovies(search_input.value)
    search_input.value = ''
  }

  useEffect(
    () => {
      const search_form = document.querySelector('#search-form')
      search_form.addEventListener('submit', e => {
        e.preventDefault()
        getSearch()
      })
    }, // eslint-disable-next-line
    []
  )

  return (
    <div>
      <div className='search-box'>
        <form id='search-form'>
          <input id='search' type='text' placeholder='Search...' />
        </form>
        <p className='fa fa-search' onClick={getSearch}></p>
      </div>
    </div>
  )
}

export default Search
