// Home ViewModel
// Manages state and actions for the Home page.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks, initialBooks } from "./HomeModel";
import { saveFavourite } from "../Favourites/FavouritesModel";
import { useAuth } from "../../context/AuthContext";
import type { Book } from "../../types/book";

export const useHomeViewModel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  const addFavourite = async (book: Book) => {
    if (!user) {
      return;
    }

    setFavouriteError(null);

    try {
      await saveFavourite(user.uid, book);
      setFavouriteIds((previousIds) => new Set(previousIds).add(book.id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong while adding the favourite";
      setFavouriteError(message);
    }
  };

  // Decides what a Favourite button click should do: redirect unauthenticated
  // users to /auth, or add the book to favourites for authenticated users.
  const handleFavouriteClick = (book: Book) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    addFavourite(book);
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
    handleFavouriteClick,
  };
};
