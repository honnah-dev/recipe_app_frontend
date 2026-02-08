import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

import { useAuth } from "../auth/AuthContext";

// Single recipe page (cook mode)
export default function RecipeView() {
  const { token } = useAuth();
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRecipe() {
      try {
        const response = await fetch(`/api/recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to load recipe.");
        }
        const data = await response.json();
        setRecipe(data);
      } catch (e) {
        setError(e.message);
      }
    }
    loadRecipe();
  }, [id, token]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-view">
      <h1>{recipe.title}</h1>

      {recipe.image_url && (
        <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />
      )}

      <p>{recipe.description}</p>

      <div className="recipe-meta">
        <p>Prep Time: {recipe.prep_time} minutes</p>
        <p>Cook Time: {recipe.cook_time} minutes</p>
        <p>Servings: {recipe.servings}</p>
      </div>

      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      {recipe.source_url && (
        <p>
          <a href={recipe.source_url} target="_blank" rel="noopener noreferrer">
            View Original Recipe
          </a>
        </p>
      )}

      <div className="recipe-nav">
        <Link to="/recipes">View All Recipes</Link>
        <Link to="/boards">View My Boards</Link>
      </div>
    </div>
  );
}
