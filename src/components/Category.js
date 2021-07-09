import { useContext } from 'react'
import { Link } from 'react-router-dom'
import MoviesContext from '../context/movies/moviesContext'

function Category({ name }) {
  const moviesContext = useContext(MoviesContext)
  const { setCategoryFilter, category_filter } = moviesContext

  const clickCategory = e => {
    setCategoryFilter(name)
  }

  if (name === category_filter) {
    return (
      <li className='active' onClick={clickCategory}>
        <Link to='#'>{name}</Link>
      </li>
    )
  } else {
    return (
      <li onClick={clickCategory}>
        <Link to='#'>{name}</Link>
      </li>
    )
  }
}

export default Category
