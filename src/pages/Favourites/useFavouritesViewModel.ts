// Favourites ViewModel
// Manages state and actions for the Favourites page.

import { useState, useEffect } from "react";
import { loadFavourites, deleteFavourite } from "./FavouritesModel";
import { useAuth } from "../../context/AuthContext";
import type { Book } from "../../types/book";

export const useFavouritesViewModel = () => {
  const { user } = useAuth();

  const [favourites, setFavourites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBooks = async () => {
    if (!user) {
      setFavourites([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await loadFavourites(user.uid);
      setFavourites(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong while loading favourites";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const removeBook = async (id: string) => {
    if (!user) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteFavourite(user.uid, id);
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

  useEffect(() => {
    loadBooks();
  }, [user]);

  return {
    favourites,
    loading,
    error,
    loadBooks,
    removeBook,
  };
};
