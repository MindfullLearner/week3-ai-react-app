
// Home View
// Renders the Home page UI: loading/error states and the book list.
// The search input lives in Header; this view only displays results.

import type { Book } from "../../types/book";

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

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.coverUrl && (
              <img src={book.coverUrl} alt={`Cover of ${book.title}`} width={80} />
            )}
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>First published: {book.firstPublishYear ?? "Unknown"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeView
