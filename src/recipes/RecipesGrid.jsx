import { useEffect, useState } from "react";

import { useAuth } from "../auth/AuthContext";
import RecipeCard from "./RecipeCard";

export default function RecipesGrid() {
  const { token } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Notes: This code runs when the component first appears on screen
    //ok also Honnah- we kept the api calls here in this file.... but in your other projects you usually put all api calls in the src>api>recipes.js file. So in this case i decided to directly put the api fetch here. but if is too confusing- you can add this fetch and make it a helper function in the api/recipes.js file and then import it here and call it. up to you!
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
  }, [token]); // <-- "Run this again if token changes"... i.e.: "Hey React, when I show up on screen, go get my recipes from the server. And if my login token ever changes, get them again."

  // Filter recipes by search (Honnah- youre keeping this but maybe take out till you fully study it. It is this recipes.filter, adn its in the <input field bellow. in the return
  
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
