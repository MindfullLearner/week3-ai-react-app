// Auth Service
// Handles Firebase Authentication communication: register, login, logout,
// and subscribing to auth state changes.

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "./firebaseService";

// Converts a Firebase Auth error into a readable message.
const toReadableAuthError = (err: unknown): Error => {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as { code: string }).code;

    switch (code) {
      case "auth/email-already-in-use":
        return new Error("An account with this email already exists.");
      case "auth/invalid-email":
        return new Error("Please enter a valid email address.");
      case "auth/weak-password":
        return new Error("Password should be at least 6 characters.");
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return new Error("Incorrect email or password.");
      case "auth/too-many-requests":
        return new Error("Too many attempts. Please try again later.");
      default:
        return new Error("Something went wrong with authentication. Please try again.");
    }
  }

  return new Error("Something went wrong with authentication. Please try again.");
};

// Registers a new user with email and password.
export const registerUser = async (email: string, password: string): Promise<User> => {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return credential.user;
  } catch (err) {
    throw toReadableAuthError(err);
  }
};

// Logs in an existing user with email and password.
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  } catch (err) {
    throw toReadableAuthError(err);
  }
};

// Logs out the currently signed-in user.
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (err) {
    throw toReadableAuthError(err);
  }
};

// Subscribes to authentication state changes.
// Returns the unsubscribe function so the caller can clean up later.
export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};
