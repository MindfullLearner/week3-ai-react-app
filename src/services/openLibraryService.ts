// This file contains communication with the Open Library API.

import type { Book, OpenLibraryDoc, OpenLibrarySearchResponse } from "../types/book";

const BASE_URL = import.meta.env.VITE_OPEN_LIBRARY_API_URL;

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

export const searchBooks = async (query: string): Promise<Book[]> => {
  const encodedQuery = encodeURIComponent(query);
  const url = `${BASE_URL}/search.json?q=${encodedQuery}`;

  console.log("[openLibraryService] Encoded search query:", encodedQuery);

  let response: Response;
  try {
    response = await fetch(url);
  } catch (networkErr) {
    const error = new Error(
      `Network error while contacting Open Library for "${query}": ${
        networkErr instanceof Error ? networkErr.message : "unknown error"
      }`
    );
    console.log("[openLibraryService] Network-level fetch error:", error, "URL was:", url);
    throw error;
  }

  if (!response.ok) {
    const error = new Error(
      `Failed to fetch books from Open Library (status: ${response.status})`
    );
    console.log("[openLibraryService] HTTP error:", error);
    throw error;
  }

  const data: OpenLibrarySearchResponse = await response.json();
  console.log("[openLibraryService] Full API response:", data);

  if (!data.docs || data.docs.length === 0) {
    const error = new Error(`No books found for "${query}"`);
    console.log("[openLibraryService] No results error:", error);
    throw error;
  }

  const books = data.docs.map(mapDocToBook);
  console.log("[openLibraryService] Mapped books:", books);

  return books;
};