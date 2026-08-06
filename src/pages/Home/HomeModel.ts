// Home Model
// Contains business logic for retrieving books for the Home page.

import { searchBooks } from "../../services/openLibraryService";
import type { Book } from "../../types/book";

// Cleans and validates the search query, then fetches matching books.
export const getBooks = async (query: string): Promise<Book[]> => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    throw new Error("Search query must be at least 2 characters long");
  }

  const books = await searchBooks(trimmedQuery);

  return books;
};
