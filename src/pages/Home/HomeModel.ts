// Home Model
// Contains business logic for retrieving books for the Home page.

import { searchBooks } from "../../services/openLibraryService";
import type { Book } from "../../types/book";

// Predefined seed keywords used to fetch a varied set of books on launch.
const SEED_KEYWORDS = [
  "Fantasy",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Adventure",
  "History",
  "Thriller",
  "Horror",
  "Comedy",
  "Psychology",
  "Programming",
  "Technology",
  "Biography",
  "Philosophy",
  "Fiction",
];

// Number of random keywords to search with. More keywords means a better
// chance of gathering at least 20 unique books after deduplication.
const KEYWORD_COUNT = 5;

// Number of books to display on the Home screen.
const INITIAL_BOOKS_COUNT = 20;

// Returns a shuffled copy of the given array (Fisher-Yates shuffle).
const shuffleArray = <T>(items: T[]): T[] => {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
};
// Cleans and validates the search query, then fetches matching books.
export const getBooks = async (query: string): Promise<Book[]> => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    throw new Error("Search query must be at least 2 characters long");
  }

  const books = await searchBooks(trimmedQuery);

  return books;
};


// Removes duplicate books based on their id.
const removeDuplicateBooks = (books: Book[]): Book[] => {
  const uniqueBooksMap = new Map<string, Book>();

  books.forEach((book) => {
    if (!uniqueBooksMap.has(book.id)) {
      uniqueBooksMap.set(book.id, book);
    }
  });

  return Array.from(uniqueBooksMap.values());
};

// Cleans and validates the search query, then fetches matching books.
export const getBooks = async (query: string): Promise<Book[]> => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    throw new Error("Search query must be at least 2 characters long");
  }

  const books = await searchBooks(trimmedQuery);

  return books;
};

// Fetches a random, varied selection of books to display when the Home
// screen first opens. A different set of keywords is chosen on every call,
// so the results differ between application launches.
export const initialBooks = async (): Promise<Book[]> => {
  const randomKeywords = shuffleArray(SEED_KEYWORDS).slice(0, KEYWORD_COUNT);

  const searchResults = await Promise.all(
    randomKeywords.map((keyword) => searchBooks(keyword))
  );

  const mergedBooks = searchResults.flat();
  const uniqueBooks = removeDuplicateBooks(mergedBooks);
  const shuffledBooks = shuffleArray(uniqueBooks);

  return shuffledBooks.slice(0, INITIAL_BOOKS_COUNT);
};
