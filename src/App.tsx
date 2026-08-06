import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import { searchBooks } from './services/openLibraryService'

function App() {
  // TEMPORARY: manual test trigger for the Open Library API integration.
  // Remove this once the real UI (search bar, ViewModel, etc.) is wired up.
  const handleTestSearch = () => {
    searchBooks('harry potter')
      .then((books) => {
        console.log('[App] TEMP test - books returned:', books)
      })
      .catch((error) => {
        console.log('[App] TEMP test - error:', error)
      })
  }

  return (
    <BrowserRouter>
      <Header />

      {/* TEMPORARY TEST BUTTON - remove after confirming API works */}
      <button onClick={handleTestSearch}>Test Open Library API</button>
    </BrowserRouter>
  )
}

export default App
