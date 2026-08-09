// Home View
// Renders the Home page UI: loading/error states and the book list.
// The search input lives in Header; this view only displays results.

import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/book";
import BookCard from "../../components/BookCard/BookCard";
import { useAuth } from "../../context/AuthContext";
import "./HomeView.css";

interface HomeViewProps {
  books: Book[];
  loading: boolean;
  error: string | null;
  favouriteIds: Set<string>;
  favouriteError: string | null;
  onAddFavourite: (book: Book) => void;
}

const HomeView = ({
  books,
  loading,
  error,
  favouriteIds,
  favouriteError,
  onAddFavourite,
}: HomeViewProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirects unauthenticated users to /auth; otherwise preserves the
  // existing add-to-favourites behaviour.
  const handleFavouriteClick = (book: Book) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    onAddFavourite(book);
  };

  return (
    <div>
      <h1>Book Finder</h1>

      {loading && <p>Loading books...</p>}

      {error && <p>{error}</p>}

      {favouriteError && <p>{favouriteError}</p>}

      <div className="book-list">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavourite={favouriteIds.has(book.id)}
            onFavouriteClick={() => handleFavouriteClick(book)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeView;