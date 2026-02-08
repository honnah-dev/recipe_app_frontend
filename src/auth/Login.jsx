import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

// ✅ TASK: "Create auth/Login.jsx"
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // ✅ TASK: "Display error messages if login fails" - store error state here
  const [error, setError] = useState(null);

  // ✅ TASK: "Add submit handler that calls POST /api/auth/login"
  const onLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      // login() calls the API and saves JWT to localStorage (handled in AuthContext)
      await login(email, password);
      // ✅ TASK: "On success: Redirect to /boards"
      navigate("/boards");
    } catch (e) {
      // ✅ TASK: "Display error messages if login fails"
      setError(e.message);
    }
  };

  return (
    <>
    {/* ✅ TASK: "Style with CSS" - className ready, CSS styling in Issue 25 Honnah! */}
    <div className="loginForm">
      <h1>Log in to your account</h1>
      <form action={onLogin}>

        {/* ✅ TASK: "Build form with email and password inputs" */}
        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button className="link-button">Login</button>
        {/* ✅ TASK: "Display error messages if login fails" */}
        {error && <p role="alert">{error}</p>}
      </form>
      {/* ✅ TASK: "Add link to signup page" */}
      <Link to="/register">Need an account? Register here.</Link>
    </div>
    </>
  );
}
