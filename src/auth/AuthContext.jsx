/**
 * AuthContext provides authentication state (token, user) and actions (login, register, logout)
 * to the entire app. Any component can access auth with the useAuth() hook.
 */
import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Check for existing token on app load
  // These useState lines check localStorage when the app first loads.
  // If user was logged in before, they stay logged in after refresh!
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // The [user, setUser] above stores current user state
  // JWT token is stored in localStorage in the login/register functions below

  // Login, register, and logout functions shared with the rest of the app
  async function login(email, password) {
    const data = await loginUser(email, password);
    // Your backend returns { token, user } together!
    setToken(data.token);
    setUser(data.user);
    // Here is where we store JWT token in localStorage:
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  async function register(username, email, password) {
    const data = await registerUser(username, email, password);
    // Your backend returns { token, user } together!
    setToken(data.token);
    setUser(data.user);
    // Here is where we store JWT token in localStorage:
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // This is what we share with the rest of the app
  const value = { token, user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// This hook lets any component access auth state: const { user, login, logout } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
