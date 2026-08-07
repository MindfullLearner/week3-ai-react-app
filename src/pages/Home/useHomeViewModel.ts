// Home ViewModel
// Manages state and actions for the Home page.

import { useState, useEffect } from "react";
import { getBooks, initialBooks } from "./HomeModel";
import type { Book } from "../../types/book";

export const useHomeViewModel = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetches a random initial set of books when the Home screen first opens.
  useEffect(() => {
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

  return {
    query,
    setQuery,
    books,
    loading,
    error,
    handleSearch,
  };
};
