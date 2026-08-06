// Shared type definitions for book data used across the app.

// A simplified book shape used throughout the application.
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  firstPublishYear: number | null;
}

// Shape of a single document returned by the Open Library Search API.
export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

// Shape of the overall response returned by the Open Library Search API.
export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  docs: OpenLibraryDoc[];
}
