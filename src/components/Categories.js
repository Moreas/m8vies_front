import Category from './Category'
const categories = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Sci-Fi', 'TV Movie', 'Thriller', 'War', 'Western']

function Categories() {
  return (
    <>
      {categories.map(name => (
        <Category key={name} name={name} />
      ))}
    </>
  )
}

export default Categories
