import { LOGIN_USER, SIGNUP_USER, LOGOUT_USER, LOGIN_ERROR_ALERT, SIGNUP_ERROR_ALERT } from '../types'

const UserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem('m8vies_token', action.payload.token)
      return {
        ...state,
        authenticated: true,
        profile: action.payload
      }
    case LOGIN_ERROR_ALERT:
      return {
        ...state,
        login_error: action.payload
      }
    case SIGNUP_ERROR_ALERT:
      return {
        ...state,
        signup_error: action.payload
      }
    case LOGOUT_USER:
      localStorage.removeItem('m8vies_token')
      return {
        ...state,
        authenticated: false,
        profile: null
      }
    case SIGNUP_USER:
      localStorage.setItem('m8vies_token', action.payload.token)
      return {
        ...state,
        authenticated: true,
        profile: action.payload
      }
    default:
      return state
  }
}

export default UserReducer
