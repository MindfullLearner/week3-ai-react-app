// Auth Context
// Provides global access to the current Firebase user and auth loading state.
// Uses authService (not Firebase directly) to observe and manage auth state.

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";
import { subscribeToAuthChanges, logoutUser } from "../services/authService";

interface AuthContextValue {
  user: User | null;
  authLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // subscribeToAuthChanges returns the unsubscribe function from
    // Firebase's onAuthStateChanged, exposed via authService.
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    await logoutUser();
  };

  if (authLoading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, authLoading, logout }}>
