// Auth ViewModel
// Manages state and actions for the Auth (login/register) page.

import { useState } from "react";
import { login, register } from "./AuthModel";

type AuthMode = "login" | "register";

export const useAuthViewModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Submits the current email/password using the appropriate AuthModel
  // function based on the current mode.
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }

      setPassword("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong during authentication";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Switches between "login" and "register" modes and clears any previous error.
  const toggleMode = () => {
    setMode((previousMode) => (previousMode === "login" ? "register" : "login"));
    setError(null);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  };
};
