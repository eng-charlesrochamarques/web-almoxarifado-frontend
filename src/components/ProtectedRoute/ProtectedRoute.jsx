import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  isLoggedIn,
  isAuthChecking,
  children,
  onUnauthorized,
}) {
  useEffect(() => {
    if (!isAuthChecking && !isLoggedIn) {
      onUnauthorized();
    }
  }, [isAuthChecking, isLoggedIn, onUnauthorized]);

  if (isAuthChecking) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
