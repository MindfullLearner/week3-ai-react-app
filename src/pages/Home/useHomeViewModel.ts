/**
 * Home page view model hook.
 * State, actions, and API interaction logic will be added here.
 */
// Home ViewModel
// Manages state and actions for the Home page.

import { useState } from "react";
import { getBooks } from "./HomeModel";
import type { Book } from "../../types/book";

export const useHomeViewModel = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
