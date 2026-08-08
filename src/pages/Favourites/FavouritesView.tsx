// Favourites View
// Renders the Favourites page UI: loading/error states, favourite book list, and removal.

import { useFavouritesViewModel } from "./useFavouritesViewModel";
import BookCard from "../../components/BookCard/BookCard";

const FavouritesView = () => {
  const { favourites, loading, error, removeBook } = useFavouritesViewModel();

  return (
    <div>
      <h1>My Favourites</h1>

      {loading && <p>Loading favourites...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && favourites.length === 0 && (
        <p>You haven't added any favourite books yet.</p>
      )}

      <div className="book-list">
        {favourites.map((book) => (
          <BookCard key={book.id} book={book} onFavouriteClick={() => removeBook(book.id)} />
        ))}
      </div>
    </div>
  );
};

export default FavouritesView;
