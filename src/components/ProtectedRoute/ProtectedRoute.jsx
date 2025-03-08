import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isLoggedInLoading, children }) {
  if (isLoggedInLoading) return null;
  return isLoggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;