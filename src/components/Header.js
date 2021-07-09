import { useContext } from 'react'
import IncognitoProfile from './IncognitoProfile'
import Profile from './Profile'
import Country from './Country'
import UserContext from '../context/user/userContext'

const countries = ['All', 'US', 'UK', 'French', 'International']
function Header() {
  const userContext = useContext(UserContext)
  const { authenticated } = userContext
  return (
    <header>
      <div className='logo'>
        <i className='fas fa-ticket-alt fa-rotate-90'></i>M8VIES
      </div>
      <div className='top-menu'>
        {countries.map(name => (
          <Country key={name} name={name} />
        ))}
      </div>
      {authenticated === true ? <Profile /> : <IncognitoProfile />}
    </header>
  )
}

export default Header
