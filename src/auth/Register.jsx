/**
 * Registration page with username/email/password form. On success, auto-logs in and redirects to /boards.
 * Auth pattern referenced from BookBuddy project.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Error state for displaying registration failure messages
  const [error, setError] = useState(null);

  // Submit handler that calls the register API
  const tryRegister = async (formData) => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // register() calls the API, saves JWT to localStorage, and logs the user in (handled in AuthContext)
      await register(username, email, password);
      // On success, redirect to the boards page
      navigate("/boards");
    } catch (e) {
      // Display error message if registration fails
      setError(e.message);
    }
  };

  return (
    <>
    <div className="registerForm">
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        {/* Username, email, and password form inputs */}
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button className="link-button">Register</button>
        {/* Show error message if registration fails */}
        {error && <p role="alert">{error}</p>}
      </form>
      {/* Link to the login page */}
      <Link to="/login">Already have an account? Log in here.</Link>
    </div>
    </>
  );
}
