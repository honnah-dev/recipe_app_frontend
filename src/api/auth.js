/**
 * API helper functions for authentication (login and register).
 * These call the backend directly at localhost:3000 (not through the Vite proxy).
 */
const API_URL = "http://localhost:3000";

export async function registerUser(username, email, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  // If login fails, the backend sends plain text like "Invalid email or password."
  // We need to check response.ok BEFORE calling .json()
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}
