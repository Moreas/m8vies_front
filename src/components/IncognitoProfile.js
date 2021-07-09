import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/user/userContext'

function IncognitoProfile() {
  const [visibility, setVisibility] = useState({ profile: false, login: false, signup: false })
  const [login, setLogin] = useState({ username: '', password: '' })
  const [signup, setSignup] = useState({ username: '', password: '', password2: '', email: '' })

  const userContext = useContext(UserContext)
  const { loginUser, checkUser, signupUser, login_error, signup_error } = userContext

  useEffect(() => {
    document.onclick = e => {
      var profile = document.getElementsByClassName('profile')[0]
      if (e.target !== profile && !profile.contains(e.target)) {
        hideProfile()
      }
    }
  }, [])

  useEffect(() => {
    checkUser()
    // eslint-disable-next-line
  }, [])

  const clickUserLogin = () => {
    loginUser(login)
  }

  const clickUserSignup = () => {
    signupUser(signup)
  }

  const hideProfile = () => {
    setVisibility({ profile: false, login: false, signup: false })
  }

  const toggleProfile = () => {
    setVisibility({ profile: !visibility.profile, login: true, signup: false })
  }

  const showLogin = () => {
    setVisibility({ ...visibility, login: true, signup: false })
    setLogin({ username: '', password: '' })
  }

  const showSignup = () => {
    setVisibility({ ...visibility, login: false, signup: true })
    setSignup({ username: '', password: '', password2: '', email: '' })
  }

  const changeLoginUsername = e => {
    setLogin({ ...login, username: e.target.value })
  }

  const changeLogisPassword = e => {
    setLogin({ ...login, password: e.target.value })
  }

  const changeSignupEmail = e => {
    setSignup({ ...signup, email: e.target.value })
  }
  const changeSignupUsername = e => {
    setSignup({ ...signup, username: e.target.value })
  }

  const changeSignupPassword = e => {
    setSignup({ ...signup, password: e.target.value })
  }

  const changeSignupPassword2 = e => {
    setSignup({ ...signup, password2: e.target.value })
  }

  return (
    <div className='profile'>
      <div id='profile-icon' onClick={toggleProfile}>
        <i className='fas fa-user-alt fa-2x'></i>
        <span className='arrow fa fa-angle-down'></span>
      </div>
      {visibility.profile && (
        <div id='profile-panel' className='anonymous'>
          <div className='top-buttons'>
            <button id='to-signin' onClick={showLogin} className={visibility.login ? 'top-active-button' : null}>
              Sign In
            </button>
            <button id='to-signup' onClick={showSignup} className={visibility.signup ? 'top-active-button' : null}>
              Sign Up
            </button>
          </div>
          {visibility.login && (
            <div id='login-form'>
              <div className='login-error'>{login_error}</div>
              <div className='control-group'>
                <input type='text' className='login-field' value={login.username} onChange={changeLoginUsername} placeholder='username' id='login-name' />
                <label className='login-field-icon fui-user' htmlFor='login-name'></label>
              </div>
              <div className='control-group'>
                <input type='password' className='login-field' value={login.password} onChange={changeLogisPassword} placeholder='password' id='login-pass' />
                <label className='login-field-icon fui-lock' htmlFor='login-pass'></label>
                <Link className='btn btn-primary btn-large btn-block' to='#' onClick={clickUserLogin}>
                  Login
                </Link>
              </div>
            </div>
          )}
          {visibility.signup && (
            <div id='signup-form'>
              <div className='login-error'>{signup_error}</div>
              <div className='control-group'>
                <input type='email' className='signup-field' value={signup.email} onChange={changeSignupEmail} placeholder='email' id='signup-email' />
                <label className='signup-field-icon fui-user' htmlFor='signup-email'></label>
              </div>
              <div className='control-group'>
                <input type='text' className='signup-field' value={signup.username} onChange={changeSignupUsername} placeholder='username' id='signup-name' />
                <label className='signup-field-icon fui-user' htmlFor='signup-name'></label>
              </div>
              <div className='control-group'>
                <input type='password' className='signup-field' value={signup.password} onChange={changeSignupPassword} placeholder='password' id='signup-pass' />
                <label className='signup-field-icon fui-lock' htmlFor='signup-pass'></label>
              </div>
              <div className='control-group'>
                <input type='password' className='signup-field' value={signup.password2} onChange={changeSignupPassword2} placeholder='confirm password' id='signup-pass2' />
                <label className='signup-field-icon fui-lock' htmlFor='signup-pass2'></label>
              </div>
              <Link className='btn btn-primary btn-large btn-block' to='#' onClick={clickUserSignup}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default IncognitoProfile
