// Auth View
// Renders the authentication UI: login/register form, mode switch, and states.

import { useAuthViewModel } from "./useAuthViewModel";
import "./AuthView.css";

const AuthView = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  } = useAuthViewModel();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <div className="auth-view">
      <div className="auth-view__card">
        <h1 className="auth-view__title">
          {mode === "login" ? "Login" : "Create Account"}
        </h1>

        <form className="auth-view__form" onSubmit={handleFormSubmit}>
          <label className="auth-view__label" htmlFor="auth-email">
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            className="auth-view__input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />

          <label className="auth-view__label" htmlFor="auth-password">
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            className="auth-view__input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 6 characters"
          />

          {error && <p className="auth-view__error">{error}</p>}

          <button type="submit" className="auth-view__submit-button" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <button type="button" className="auth-view__toggle-button" onClick={toggleMode}>
          {mode === "login"
            ? "Don't have an account? Create one"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthView;
