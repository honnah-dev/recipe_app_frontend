import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [importUrl, setImportUrl] = useState("");

  function handleImport() {
    if (!importUrl.trim()) return;
    navigate("/recipes/import", { state: { url: importUrl } });
    setImportUrl("");
  }

  return (
    <header id="navbar">
  <NavLink id="brand" to="/boards">
    <img src="/REd_Simmer.svg" alt="Simmer" className="logo" />
  </NavLink>

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

  <nav className="main-nav">
    <NavLink to="/boards" className="nav-link">My Boards</NavLink>
    <NavLink to="/recipes" className="nav-link">My Recipes</NavLink>

    {token ? (
      <button onClick={logout} className="auth-btn">Log out</button>
    ) : (
      <NavLink to="/login" className="auth-btn">Log in</NavLink>
    )}
  </nav>
</header>
  );
}
