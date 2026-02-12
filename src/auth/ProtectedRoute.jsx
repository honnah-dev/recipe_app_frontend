import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

// Wrapper component that checks if user is logged in
// This component wraps around protected pages like /boards
// Usage in App.jsx: <ProtectedRoute><BoardsGrid /></ProtectedRoute>
export default function ProtectedRoute({ children }) {
  // Check if user is logged in by looking for a token
  const { token } = useAuth();

  // Redirect to /login if not authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If logged in, show the protected page (whatever is inside the wrapper)
  return children;
}
