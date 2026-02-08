import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

// ✅ TASK: "Wrapper component that checks if user is logged in"
// This component wraps around protected pages like /boards
// Usage in App.jsx: <ProtectedRoute><BoardsPage /></ProtectedRoute>
export default function ProtectedRoute({ children }) {
  // Check if user is logged in by looking for a token
  const { token } = useAuth();

  // ✅ TASK: "Redirects to /login if not authenticated"
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If logged in, show the protected page (whatever is inside the wrapper)
  return children;
}
