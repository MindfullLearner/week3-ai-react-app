// Favourites Model
// Acts as a thin wrapper around firebaseService for favourite book data.

import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from "../../services/firebaseService";
import type { Book } from "../../types/book";

// Loads all favourite books.
export const loadFavourites = async (): Promise<Book[]> => {
  return getFavourites();
};

// Saves a book to favourites, using the book's id as the unique identifier.
export const saveFavourite = async (book: Book): Promise<void> => {
  return addFavourite(book);
};

// Deletes a favourite book by its id.
export const deleteFavourite = async (id: string): Promise<void> => {
  return removeFavourite(id);
};
