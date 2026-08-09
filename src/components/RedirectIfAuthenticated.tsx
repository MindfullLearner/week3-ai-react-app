// RedirectIfAuthenticated
// Redirects already-authenticated users away from /auth back to /.
// Renders nothing while authLoading is true, so no redirect decision
// is made prematurely.

import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RedirectIfAuthenticatedProps {
  children: ReactNode;
}

const RedirectIfAuthenticated = ({ children }: RedirectIfAuthenticatedProps) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return null;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RedirectIfAuthenticated;
