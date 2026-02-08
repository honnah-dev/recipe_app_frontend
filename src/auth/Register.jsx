import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

// ✅ TASK: "Create auth/Signup.jsx" (we named it Register.jsx) ALSO, HOnnah! This code is basically directly out of the bookBuddy project- reference for any mistakes. 
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // ✅ TASK: "Display error messages" - store error state here
  const [error, setError] = useState(null);

  // ✅ TASK: "Call POST /api/auth/register"
  const tryRegister = async (formData) => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // register() calls the API and saves JWT to localStorage (handled in AuthContext)
      // ✅ TASK: "On success: Automatically log user in (save JWT)"
      await register(username, email, password);
      // ✅ TASK: "On success: Redirect to /boards"
      navigate("/boards");
    } catch (e) {
      // ✅ TASK: "Display error messages"
      setError(e.message);
    }
  };

  return (
    <>
    {/* ✅ TASK: "Style with CSS" - className ready, CSS styling in Issue 25 */}
    <div className="registerForm">
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        {/* ✅ TASK: "Build form with username, email, and password inputs" */}
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
        {/* ✅ TASK: "Display error messages" */}
        {error && <p role="alert">{error}</p>}
      </form>
      {/* ✅ TASK: "Add link to login page" */}
      <Link to="/login">Already have an account? Log in here.</Link>
    </div>
    </>
  );
}
