import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await register(username, email, password);
      navigate("/recipes/import");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="login-page">
      <div className="registerForm">
        <h1>Register for an account</h1>
        <form action={tryRegister}>
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
          {error && <p role="alert">{error}</p>}
        </form>
        <Link to="/login">Already have an account? Log in here.</Link>
      </div>

      <div className="login-branding">
        <img src="/Simmer_logo.svg" alt="Simmer" className="login-logo" />
        <p className="tagline">Skip the Clutter. Keep the Recipe.</p>
      </div>
    </div>
  );
}
