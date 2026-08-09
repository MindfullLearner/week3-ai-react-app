import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'

interface HeaderProps {
  query: string
  setQuery: (value: string) => void
  onSearch: () => void
  onHomeClick: () => void
}

function Header({ query, setQuery, onSearch, onHomeClick }: HeaderProps) {
  const { user, logout } = useAuth()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch()
  }

  return (
    <header className="header">
      <nav className="header__nav" aria-label="Main navigation">
        <Link to="/" className="header__link" onClick={onHomeClick}>
          Home
        </Link>
        <Link to="/favourites" className="header__link">
          Favourites
        </Link>

        {user ? (
          <button type="button" className="header__logout-button" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/auth" className="header__link">
            Login
          </Link>
        )}
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