// Firebase Service
// Initializes Firebase (app, Realtime Database, Authentication, and Firestore)
// and provides functions for managing favourite books via Realtime Database.
//
// NOTE: Authentication and Firestore are initialized here for future use.
// The existing favourites feature continues to run on Realtime Database (db)
// and is unchanged.

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

// Realtime Database instance - existing favourites feature depends on this.
export const db = getDatabase(app);

// Firebase Authentication instance - not wired to any UI yet.
export const auth = getAuth(app);

// Cloud Firestore instance - not used by any feature yet.
export const firestoreDb = getFirestore(app);

// ---------------------------------------------------------------------------
// Favourites functionality (Realtime Database) - unchanged from before.
// ---------------------------------------------------------------------------

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

    return favourites;
  } catch (err) {
    throw new Error("Failed to load favourite books");
  }
};
