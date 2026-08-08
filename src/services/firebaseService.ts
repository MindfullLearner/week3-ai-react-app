// Firebase Service
// Initializes Firebase, exposes the Firestore database instance,
// and provides functions for managing favourite books.

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
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

export const db = getFirestore(app);

// Name of the Firestore collection used to store favourite books.
const FAVOURITES_COLLECTION = "favourites";

// Adds a book to the favourites collection, using the book's id as the document id.
export const addFavourite = async (book: Book): Promise<void> => {
  try {
    const favouriteRef = doc(db, FAVOURITES_COLLECTION, book.id);
    await setDoc(favouriteRef, book);
  } catch (err) {
    throw new Error(`Failed to add "${book.title}" to favourites`);
  }
};

// Removes a book from the favourites collection by its id.
export const removeFavourite = async (id: string): Promise<void> => {
  try {
    const favouriteRef = doc(db, FAVOURITES_COLLECTION, id);
    await deleteDoc(favouriteRef);
  } catch (err) {
    throw new Error(`Failed to remove book with id "${id}" from favourites`);
  }
};

// Retrieves all favourite books from Firestore.
export const getFavourites = async (): Promise<Book[]> => {
  try {
    const favouritesSnapshot = await getDocs(collection(db, FAVOURITES_COLLECTION));
    const favourites = favouritesSnapshot.docs.map((docSnapshot) => docSnapshot.data() as Book);

    return favourites;
  } catch (err) {
    throw new Error("Failed to load favourite books");
  }
};
