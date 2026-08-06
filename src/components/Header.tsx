import { Link } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  query: string
  setQuery: (value: string) => void
  onSearch: () => void
}

function Header({ query, setQuery, onSearch }: HeaderProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch()
  }

  return (
    <header className="header">
      <nav className="header__nav" aria-label="Main navigation">
        <Link to="/" className="header__link">
          Home
        </Link>
        <Link to="/favourites" className="header__link">
          Favourites
        </Link>
      </nav>

      <form className="header__search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="header__search-input"
          placeholder="Search for books..."
          aria-label="Search for books"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" className="header__search-button">
          Search
        </button>
      </form>
    </header>
  )
}

export default Header
