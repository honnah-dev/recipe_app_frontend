/**
 * Login page with email/password form. On success, redirects to /boards.
 * Auth pattern referenced from BookBuddy project.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Error state for displaying login failure messages
  const [error, setError] = useState(null);

  // Submit handler that calls the login API
  const onLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      // login() calls the API and saves JWT to localStorage (handled in AuthContext)
      await login(email, password);
      // On success, redirect to the boards page
      navigate("/boards");
    } catch (e) {
      // Display error message if login fails
      setError(e.message);
    }
  };

  return (
    <>
    <div className="loginForm">
      <h1>Log in to your account</h1>
      <form action={onLogin}>

        {/* Email and password form inputs */}
        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button className="link-button">Login</button>
        {/* Show error message if login fails */}
        {error && <p role="alert">{error}</p>}
      </form>
      {/* Link to the registration page */}
      <Link to="/register">Need an account? Register here.</Link>
    </div>
    </>
  );
}
