// Firebase Service
// Initializes Firebase (app, Realtime Database, Authentication, and Firestore)
// and provides functions for managing a signed-in user's favourite books.

import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  remove,
  get,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
export const auth = getAuth(app);
export const firestoreDb = getFirestore(app);

// ---------------------------------------------------------------------------
// Favourites functionality (Realtime Database)
// Structure: users/{userId}/favourites/{bookId}
// ---------------------------------------------------------------------------

// Open Library ids look like "/works/OL45804W". Firebase treats "/" as a
// path separator, so using the id directly as a key would create nested
// nodes instead of one flat entry. This converts it into a safe, flat key
// while the original id is still stored unchanged inside the book object.
const toSafeKey = (id: string): string => id.replace(/\//g, "_");

// Builds the favourites path for a given user, throwing a readable error
// if userId is missing.
const getUserFavouritesPath = (userId: string): string => {
  if (!userId) {
    throw new Error("A user ID is required to manage favourites.");
  }

  return `users/${userId}/favourites`;
};

// Adds a book to a specific user's favourites.
export const addFavourite = async (userId: string, book: Book): Promise<void> => {
  const favouritesPath = getUserFavouritesPath(userId);

  try {
    const favouriteRef = ref(db, `${favouritesPath}/${toSafeKey(book.id)}`);
    await set(favouriteRef, book);
  } catch (err) {
    throw new Error(`Failed to add "${book.title}" to favourites`);
  }
};

// Removes a favourite book by id for a specific user.
export const removeFavourite = async (userId: string, id: string): Promise<void> => {
  const favouritesPath = getUserFavouritesPath(userId);

  try {
    const favouriteRef = ref(db, `${favouritesPath}/${toSafeKey(id)}`);
    await remove(favouriteRef);
  } catch (err) {
    throw new Error(`Failed to remove book with id "${id}" from favourites`);
  }
};

// Retrieves all favourite books for a specific user.
export const getFavourites = async (userId: string): Promise<Book[]> => {
  const favouritesPath = getUserFavouritesPath(userId);

  try {
    const favouritesRef = ref(db, favouritesPath);
    const snapshot = await get(favouritesRef);

    if (!snapshot.exists()) {
      return [];
    }

    const favouritesObject = snapshot.val() as Record<string, Book>;
    const favourites = Object.values(favouritesObject);

    return favourites;
  } catch (err) {
    throw new Error("Failed to load favourite books");
  }
};
