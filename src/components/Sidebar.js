import Categories from './Categories'
import Search from './Search'

function Sidebar() {
  return (
    <aside className='sidebar'>
      <Search />
      <menu className='menu'>
        <p className='menu-name'>
          <i className='fas fa-film fa-1x'></i>Categories
        </p>
        <ul>
          <Categories />
        </ul>
      </menu>
    </aside>
  )
}

export default Sidebar
