import { useEffect, useState } from "react";

import { useAuth } from "../auth/AuthContext";
import RecipeCard from "./RecipeCard";

export default function RecipesGrid() {
  const { token } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("/api/recipes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setRecipes(data);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchRecipes();
  }, [token]);

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
