// Favourites Model
// Acts as a thin wrapper around firebaseService for favourite book data.

import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from "../../services/firebaseService";
import type { Book } from "../../types/book";

export const loadFavourites = async (userId: string): Promise<Book[]> => {
  return getFavourites(userId);
};

export const saveFavourite = async (userId: string, book: Book): Promise<void> => {
  return addFavourite(userId, book);
};

export const deleteFavourite = async (userId: string, id: string): Promise<void> => {
  return removeFavourite(userId, id);
};
