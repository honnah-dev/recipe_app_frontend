import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // ✅ TASK: "Check for existing token on app load"
  // These useState lines check localStorage when the app first loads.
  // If user was logged in before, they stay logged in after refresh!
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ TASK: "Store current user state" - the [user, setUser] above stores user state
  // ✅ TASK: "Store JWT token in localStorage" - happens in login/register below

  // ✅ TASK: "Provide login/logout functions"
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
