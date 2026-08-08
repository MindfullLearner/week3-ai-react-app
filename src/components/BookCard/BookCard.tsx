// BookCard
// A presentational component that displays a single book's details.

import type { Book } from "../../types/book";
import "./BookCard.css";

interface BookCardProps {
  book: Book;
  onFavouriteClick?: (book: Book) => void;
}

const BookCard = ({ book, onFavouriteClick }: BookCardProps) => {
  return (
    <div className="book-card">
      {book.coverUrl ? (
        <img
          className="book-card__cover"
          src={book.coverUrl}
          alt={`Cover of ${book.title}`}
        />
      ) : (
        <div className="book-card__cover book-card__cover--placeholder">
          No Cover
        </div>
      )}

      <div className="book-card__details">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        <p className="book-card__year">
          First published: {book.firstPublishYear ?? "Unknown"}
        </p>

        <button
          type="button"
          className="book-card__favourite-button"
          onClick={() => onFavouriteClick?.(book)}
        >
          ♡ Favourite
        </button>
      </div>
    </div>
  );
};

export default BookCard;
