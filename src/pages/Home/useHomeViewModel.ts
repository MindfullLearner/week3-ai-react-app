// Home ViewModel
// Manages state and actions for the Home page.

import { useState, useEffect } from "react";
import { getBooks, initialBooks } from "./HomeModel";
import { saveFavourite } from "../Favourites/FavouritesModel";
import type { Book } from "../../types/book";

export const useHomeViewModel = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tracks which book ids have been added to favourites, so BookCard
  // can reflect favourite status in the UI.
  const [favouriteIds, setFavouriteIds] = useState<Set<string>>(new Set());
  const [favouriteError, setFavouriteError] = useState<string | null>(null);

  // Loads a fresh random selection of books using the existing initialBooks() logic.
  const loadInitialBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await initialBooks();
      setBooks(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong while loading books";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Fetches a random initial set of books when the Home screen first opens.
  useEffect(() => {
    loadInitialBooks();
  }, []);

  // Fetches books based on the current query and updates state accordingly.
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getBooks(query);
      setBooks(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong while searching for books";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Adds a book to favourites and updates local state so the UI reflects it.
  const handleAddFavourite = async (book: Book) => {
    setFavouriteError(null);

    try {
      await saveFavourite(book);
      setFavouriteIds((previousIds) => new Set(previousIds).add(book.id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong while adding the favourite";
      setFavouriteError(message);
    }
  };

  return {
    query,
    setQuery,
    books,
    loading,
    error,
    handleSearch,
    loadInitialBooks,
    favouriteIds,
    favouriteError,
    handleAddFavourite,
  };
};