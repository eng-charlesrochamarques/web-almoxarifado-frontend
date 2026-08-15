import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, onUnauthorized }) {
  useEffect(() => {
    if (!isLoggedIn) {
      onUnauthorized();
    }
  }, [isLoggedIn, onUnauthorized]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
