import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomeView from './pages/Home/HomeView'
import FavouritesView from './pages/Favourites/FavouritesView'
import { useHomeViewModel } from './pages/Home/useHomeViewModel'

function App() {
  const { query, setQuery, books, loading, error, handleSearch, loadInitialBooks } =
    useHomeViewModel()

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
          element={<HomeView books={books} loading={loading} error={error} />}
        />
        <Route path="/favourites" element={<FavouritesView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
