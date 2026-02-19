import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login(email, password);
      navigate("/boards");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="login-page">
      <div className="loginForm">
        <h1>Log in to your account</h1>
        <form action={onLogin}>

          <label>
            Email
            <input type="email" name="email" required />
          </label>

          <label>
            Password
            <input type="password" name="password" required />
          </label>

          <button className="link-button">Login</button>
          {error && <p role="alert">{error}</p>}
        </form>
        <Link to="/register">Need an account? Register here.</Link>
      </div>

      <div className="login-branding">
        <img src="/Simmer_logo.svg" alt="Simmer" className="login-logo" />
        <p className="tagline">Skip the Clutter. Keep the Recipe.</p>
      </div>
    </div>
  );
}
