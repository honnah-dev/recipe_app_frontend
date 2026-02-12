/**
 * RecipesGrid displays all of the user's saved recipes in a grid layout.
 * Includes a search bar that filters recipes by title on the client side.
 */
import { useEffect, useState } from "react";

import { useAuth } from "../auth/AuthContext";
import RecipeCard from "./RecipeCard";

export default function RecipesGrid() {
  const { token } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // This code runs when the component first appears on screen.
    // The API call is directly in this file instead of a separate api/recipes.js helper.
    async function fetchRecipes() {
      try {
        const response = await fetch("/api/recipes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setRecipes(data);  // Save recipes to state
      } catch (e) {
        setError(e.message);  // Now setError is used!
      }
    }
    fetchRecipes();
  }, [token]); // Re-run this effect if token changes

  // Filter recipes by search text - uses .filter() to only show recipes whose title matches the search input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="recipes-grid">
      <h1>All Recipes</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search recipes..."
      />

      {filteredRecipes.length === 0 ? (
        <p>No recipes yet! Import your first recipe above in the url field ↑</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
    </div>
  );
}
