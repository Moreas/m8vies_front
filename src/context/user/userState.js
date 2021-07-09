import { useReducer, useContext } from 'react'
import Axios from 'axios'
import UserContext from './userContext'
import UserReducer from './userReducer'
import MoviesContext from '../../context/movies/moviesContext'
import { LOGIN_USER, SIGNUP_USER, LOGOUT_USER, LOGIN_ERROR_ALERT, SIGNUP_ERROR_ALERT } from '../types'

const UserState = props => {
  const initialState = {
    authenticated: false,
    profile: null,
    login_error: null,
    signup_error: null,
    valid_email: true,
    valid_password: true,
    valid_username: true
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)

  const moviesContext = useContext(MoviesContext)

  const { getFavoriteMoviesList, getMovies } = moviesContext

  const checkUser = async () => {
    const token = localStorage.getItem('m8vies_token')
    if (token) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const data = {
          token: token
        }
        let url = `https://moreas.pythonanywhere.com/check_user_token/`
        const res = await Axios.post(url, data, config)
        const profile = res.data
        dispatch({
          type: LOGIN_USER,
          payload: { token: token, username: profile.username }
        })
        getFavoriteMoviesList(profile.username)
      } catch (err) {}
    }
  }

  const loginUser = async profile => {
    if (profile.username === '' || profile.password === '') {
      dispatch({
        type: LOGIN_ERROR_ALERT,
        payload: 'fields cannot be empty'
      })
      setTimeout(() => {
        dispatch({ type: LOGIN_ERROR_ALERT, payload: null })
      }, 5000)
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        let url = `https://moreas.pythonanywhere.com/api-token-auth/`
        const res = await Axios.post(url, profile, config)
        const token = res.data.token
        dispatch({
          type: LOGIN_USER,
          payload: { token: token, username: profile.username }
        })
      } catch (err) {
        dispatch({
          type: LOGIN_ERROR_ALERT,
          payload: err.response.data.non_field_errors
        })
        setTimeout(() => {
          dispatch({ type: LOGIN_ERROR_ALERT, payload: null })
        }, 5000)
      }
    }
  }

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER
    })
    getMovies()
  }

  const signupUser = async profile => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (profile.username === '' || profile.email === '' || profile.password === '' || profile.password2 === '') {
      dispatch({
        type: SIGNUP_ERROR_ALERT,
        payload: 'fields cannot be empty'
      })
      setTimeout(() => {
        dispatch({ type: SIGNUP_ERROR_ALERT, payload: null })
      }, 5000)
    } else if (profile.password !== profile.password2) {
      dispatch({
        type: SIGNUP_ERROR_ALERT,
        payload: 'Passwords do not match'
      })
      setTimeout(() => {
        dispatch({ type: SIGNUP_ERROR_ALERT, payload: null })
      }, 5000)
    } else if (profile.username.length > 8) {
      dispatch({
        type: SIGNUP_ERROR_ALERT,
        payload: 'Username cannot exceed 8 characters'
      })
      setTimeout(() => {
        dispatch({ type: SIGNUP_ERROR_ALERT, payload: null })
      }, 5000)
    } else if (!re.test(String(profile.email).toLowerCase())) {
      dispatch({
        type: SIGNUP_ERROR_ALERT,
        payload: 'Incorrect Email'
      })
      clearTimeout()
      setTimeout(() => {
        dispatch({ type: SIGNUP_ERROR_ALERT, payload: null })
      }, 5000)
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        let url = `https://moreas.pythonanywhere.com/create_auth/`
        const res = await Axios.post(url, profile, config)
        const token = res.data.token
        dispatch({
          type: SIGNUP_USER,
          payload: { token: token, username: profile.username }
        })
      } catch (err) {
        dispatch({
          type: SIGNUP_ERROR_ALERT,
          payload: err.response.data.username[0]
        })
        console.log(err.response.data.username[0])
        clearTimeout()
        setTimeout(() => {
          dispatch({ type: SIGNUP_ERROR_ALERT, payload: null })
        }, 5000)
      }
    }
  }

  return <UserContext.Provider value={{ loginUser, logoutUser, checkUser, signupUser, authenticated: state.authenticated, profile: state.profile, login_error: state.login_error, signup_error: state.signup_error }}>{props.children}</UserContext.Provider>
}

export default UserState
