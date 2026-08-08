// Firebase Service
// Initializes Firebase, exposes the Realtime Database instance,
// and provides functions for managing favourite books.

import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  remove,
  get,
} from "firebase/database";
import type { Book } from "../types/book";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

// Path (node) in the Realtime Database used to store favourite books.
const FAVOURITES_PATH = "favourites";

// Open Library ids look like "/works/OL45804W". Firebase treats "/" as a
// path separator, so using the id directly as a key would create nested
// nodes instead of one flat entry. This converts it into a safe, flat key
// while the original id is still stored unchanged inside the book object.
const toSafeKey = (id: string): string => id.replace(/\//g, "_");

// Adds a book to favourites, using a sanitized version of the book's id as its key.
export const addFavourite = async (book: Book): Promise<void> => {
  try {
    // TEMP DEBUG LOG: inspect the exact book object being written
    console.log("[firebaseService] addFavourite - book:", book);

    const favouriteRef = ref(db, `${FAVOURITES_PATH}/${toSafeKey(book.id)}`);
    await set(favouriteRef, book);
  } catch (err) {
    throw new Error(`Failed to add "${book.title}" to favourites`);
  }
};

// Removes a favourite book by its id.
export const removeFavourite = async (id: string): Promise<void> => {
  try {
    const favouriteRef = ref(db, `${FAVOURITES_PATH}/${toSafeKey(id)}`);
    await remove(favouriteRef);
  } catch (err) {
    throw new Error(`Failed to remove book with id "${id}" from favourites`);
  }
};

// Retrieves all favourite books from the Realtime Database.
export const getFavourites = async (): Promise<Book[]> => {
  try {
    const favouritesRef = ref(db, FAVOURITES_PATH);
    const snapshot = await get(favouritesRef);

    if (!snapshot.exists()) {
      return [];
    }

    const favouritesObject = snapshot.val() as Record<string, Book>;
    const favourites = Object.values(favouritesObject);

    // TEMP DEBUG LOG: inspect exactly what comes back from Firebase
    console.log("[firebaseService] getFavourites - retrieved:", favourites);

    return favourites;
  } catch (err) {
    throw new Error("Failed to load favourite books");
  }
};