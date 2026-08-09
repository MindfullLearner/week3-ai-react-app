import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeView from './pages/Home/HomeView'
import FavouritesView from './pages/Favourites/FavouritesView'
import AuthView from './pages/Auth/AuthView'
import ProtectedRoute from './components/ProtectedRoute'
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated'
import { useHomeViewModel } from './pages/Home/useHomeViewModel'

function App() {
  const {
    query,
    setQuery,
    books,
    loading,
    error,
    handleSearch,
    loadInitialBooks,
    favouriteIds,
    favouriteError,
    handleFavouriteClick,
  } = useHomeViewModel()

  return (
    <BrowserRouter>
      <Header
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onHomeClick={loadInitialBooks}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomeView
              books={books}
              loading={loading}
              error={error}
              favouriteIds={favouriteIds}
              favouriteError={favouriteError}
              onFavouriteClick={handleFavouriteClick}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <FavouritesView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <RedirectIfAuthenticated>
              <AuthView />
            </RedirectIfAuthenticated>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App