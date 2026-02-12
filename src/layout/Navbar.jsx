import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

import { useAuth } from "../auth/AuthContext";

/**
 * Navbar displays the logo, a persistent URL import field, navigation links,
 * and a login/logout button. Visible on every page via the Layout component.
 */
export default function Navbar() {
  // logout clears localStorage and updates AuthContext (see AuthContext.jsx)
  // Redirect to /login happens automatically via ProtectedRoute when token becomes null
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [importUrl, setImportUrl] = useState("");

  // When user clicks "Import", navigate to the import page and pass the URL along
  function handleImport() {
    if (!importUrl.trim()) return;
    navigate("/recipes/import", { state: { url: importUrl } });
    setImportUrl("");
  }

  return (
    <header id="navbar">
  {/* Logo and brand name - outside nav */}
  <NavLink id="brand" to="/boards">
    <img src="/assets/logo.png" alt="Logo" className="logo" />
    <p>RecipeBox</p>
  </NavLink>

  {/* URL import field - outside nav because it's a form, not navigation */}
  <div className="url-import">
    <input
      type="url"
      placeholder="Paste recipe URL..."
      className="url-input"
      value={importUrl}
      onChange={(e) => setImportUrl(e.target.value)}
    />
    <button className="import-btn" onClick={handleImport}>Import</button>
  </div>

  {/* Navigation links - inside nav */}
  <nav className="main-nav">
    <NavLink to="/boards" className="nav-link">My Boards</NavLink>
    <NavLink to="/recipes" className="nav-link">All Recipes</NavLink>

    {/* Login and Logout both use auth-btn class to look like buttons */}
    {token ? (
      <button onClick={logout} className="auth-btn">Log out</button>
    ) : (
      <NavLink to="/login" className="auth-btn">Log in</NavLink>
    )}
  </nav>
</header>
  );
}
