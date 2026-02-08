import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

// ✅ TASK: "Create layout/Navigation.jsx" (we named it Navbar.jsx)
// ✅ TASK: "Style with CSS" - classes ready, CSS styling in Issue 25
export default function Navbar() {
  // ✅ TASK: "Handle logout" - logout clears localStorage & updates AuthContext (see AuthContext.jsx)
  // Note: redirect to /login happens automatically via ProtectedRoute when token becomes null
  const { token, logout } = useAuth();


  return (
    <header id="navbar">
  {/* Honnah- this is the Logo - outside nav */}
  <NavLink id="brand" to="/boards">
    <img src="/assets/logo.png" alt="Logo" className="logo" />
    <p>RecipeBox</p>
  </NavLink>

  {/* ✅ TASK: "Add persistent URL input field (always visible)" */}
  {/* ✅ TASK: "Add Import Recipe button next to URL input" */}
  {/* I am putting the URL Import - outside nav (becuase it's a form, not navigation) */}
  <div className="url-import">
    <input type="url" placeholder="Paste recipe URL..." className="url-input" />
    <button className="import-btn">Import</button>
  </div>

  {/* ✅ TASK: "Add navigation links: My Boards | All Recipes" */}
  {/* Navigation links - inside nav */}
  <nav className="main-nav">
    <NavLink to="/boards" className="nav-link">My Boards</NavLink>
    <NavLink to="/recipes" className="nav-link">All Recipes</NavLink>

    {/* ✅ TASK: "Add Logout button" */}
    {/* Honah- I made tge Login and Logout both use auth-btn class to look like buttons */}
    {token ? (
      <button onClick={logout} className="auth-btn">Log out</button>
    ) : (
      <NavLink to="/login" className="auth-btn">Log in</NavLink>
    )}
  </nav>
</header>
  );
}
