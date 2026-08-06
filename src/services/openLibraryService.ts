// This file will contain communication with the Open Library API.
// API requests will be implemented here later.

export {};
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

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch books from Open Library (status: ${response.status})`
    );
  }

  const data: OpenLibrarySearchResponse = await response.json();

  if (!data.docs || data.docs.length === 0) {
    throw new Error(`No books found for "${query}"`);
  }

  return data.docs.map(mapDocToBook);
};
