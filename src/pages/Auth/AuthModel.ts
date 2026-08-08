// Auth Model
// Contains validation and business logic for registration, login, and logout.

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../../services/authService";
import type { User } from "firebase/auth";

// Normalizes an email address by trimming whitespace and lowercasing it.
const normalizeEmail = (email: string): string => email.trim().toLowerCase();

// Validates email and password, then registers a new user.
export const register = async (email: string, password: string): Promise<User> => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const user = await registerUser(normalizedEmail, password);

  return user;
};

// Validates email and password, then logs in an existing user.
export const login = async (email: string, password: string): Promise<User> => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const user = await loginUser(normalizedEmail, password);

  return user;
};

// Logs out the currently signed-in user.
export const logout = async (): Promise<void> => {
  await logoutUser();
};
