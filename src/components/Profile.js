import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user/userContext'
import MoviesContext from '../context/movies/moviesContext'

function Profile() {
  const [visibility, setVisibility] = useState(false)
  const userContext = useContext(UserContext)
  const moviesContext = useContext(MoviesContext)
  const { profile, logoutUser } = userContext
  const { getFavoriteMovies } = moviesContext

  useEffect(() => {
    let unmounted = false
    if (!unmounted) {
      document.onclick = e => {
        var profile = document.getElementsByClassName('profile-username')[0]
        if (profile && e.target !== profile && !profile.contains(e.target)) {
          hideProfile()
        }
      }
      return () => {
        unmounted = true
      }
    }
  }, [])

  const hideProfile = () => {
    setVisibility(false)
  }

  const toggleProfile = () => {
    setVisibility(!visibility)
  }

  const logout = () => {
    logoutUser()
  }

  const clickFavorite = () => {
    getFavoriteMovies(profile.username)
  }

  return (
    <>
      <div className='profile-username'>
        <div id='profile-icon' onClick={toggleProfile}>
          <i className='fas fa-user-alt fa'></i>
          <span>{profile.username}</span>
          <span className='arrow fa fa-angle-down'></span>
        </div>
        {visibility && (
          <div id='profile-panel'>
            <div onClick={clickFavorite}>Favorite Movies</div>
            <div onClick={logout}>Logout</div>
          </div>
        )}
      </div>
    </>
  )
}

export default Profile
