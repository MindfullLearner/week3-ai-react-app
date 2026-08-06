// This file will contain communication with the Open Library API.
// API requests will be implemented here later.

export {};
// This file contains communication with the Open Library API.
// This file contains communication with the Open Library API.

import type { Book, OpenLibraryDoc, OpenLibrarySearchResponse } from "../types/book";

const BASE_URL = import.meta.env.VITE_OPEN_LIBRARY_API_URL;

// Converts a single Open Library document into our simplified Book shape.
const mapDocToBook = (doc: OpenLibraryDoc): Book => {
  return {
    id: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? "Unknown author",
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    firstPublishYear: doc.first_publish_year ?? null,
  };
};

// Searches for books using the Open Library Search API.
export const searchBooks = async (query: string): Promise<Book[]> => {
  const encodedQuery = encodeURIComponent(query);
  const url = `${BASE_URL}/search.json?q=${encodedQuery}`;

  // TEMP DEBUG LOG: verify the encoded query before the request is sent
  console.log("[openLibraryService] Encoded search query:", encodedQuery);

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      `Failed to fetch books from Open Library (status: ${response.status})`
    );

    // TEMP DEBUG LOG: log the error before throwing
    console.log("[openLibraryService] HTTP error:", error);

    throw error;
  }

  const data: OpenLibrarySearchResponse = await response.json();

  // TEMP DEBUG LOG: verify the full API response after a successful request
  console.log("[openLibraryService] Full API response:", data);

  if (!data.docs || data.docs.length === 0) {
    const error = new Error(`No books found for "${query}"`);

    // TEMP DEBUG LOG: log the error before throwing
    console.log("[openLibraryService] No results error:", error);

    throw error;
  }

  const books = data.docs.map(mapDocToBook);

  // TEMP DEBUG LOG: verify the mapped array of books returned by searchBooks()
  console.log("[openLibraryService] Mapped books:", books);

  return books;
};
