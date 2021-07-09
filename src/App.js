import './styles/App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import FeaturedMovie from './components/FeaturedMovie'
import Movies from './components/Movies'
import MovieCard from './components/MovieCard'

import UserState from './context/user/userState'
import MoviesState from './context/movies/moviesState'

function App() {
  return (
    <MoviesState>
      <UserState>
        <Router>
          <div className='window-margin'>
            <div className='window'>
              <Header />
              <main>
                <Sidebar />
                <div className='content'>
                  <MovieCard />
                  <FeaturedMovie />
                  <Movies />
                </div>
              </main>
            </div>
          </div>
        </Router>
      </UserState>
    </MoviesState>
  )
}

export default App
