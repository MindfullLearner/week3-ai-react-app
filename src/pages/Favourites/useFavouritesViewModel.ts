// Favourites ViewModel
// Manages state and actions for the Favourites page.

import { useState, useEffect } from "react";
import { loadFavourites, deleteFavourite } from "./FavouritesModel";
import type { Book } from "../../types/book";

export const useFavouritesViewModel = () => {
  const [favourites, setFavourites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Loads all favourite books and updates state accordingly.
  const loadBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await loadFavourites();
      setFavourites(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong while loading favourites";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Removes a favourite book by id and updates local state on success.
  const removeBook = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await deleteFavourite(id);
      setFavourites((previousFavourites) =>
        previousFavourites.filter((book) => book.id !== id)
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong while removing the favourite";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Loads favourites when the Favourites screen first opens.
  useEffect(() => {
    loadBooks();
  }, []);

  return {
    favourites,
    loading,
    error,
    loadBooks,
    removeBook,
  };
};
