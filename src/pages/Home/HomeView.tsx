// Home View
// Renders the Home page UI: loading/error states and the book list.
// The search input lives in Header; this view only displays results.

import type { Book } from "../../types/book";
import BookCard from "../../components/BookCard/BookCard";
import "./HomeView.css";

interface HomeViewProps {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const HomeView = ({ books, loading, error }: HomeViewProps) => {
  return (
    <div>
      <h1>Book Finder</h1>

      {loading && <p>Loading books...</p>}

      {error && <p>{error}</p>}

      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default HomeView;
