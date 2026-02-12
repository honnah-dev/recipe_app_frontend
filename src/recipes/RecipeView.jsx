/**
 * RecipeView displays a single recipe in "cook mode" with full details.
 * Fetches recipe by ID from the URL params. Includes delete functionality.
 */
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";

import { useAuth } from "../auth/AuthContext";
export default function RecipeView() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

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


  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw Error(result.message);
      }

      navigate("/recipes");
    } catch (e) {
      setError(e.message);
    }
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-view">
      <button onClick={() => window.history.back()}>Back to all recipes</button>
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
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {recipe.source_url && (
        <p>
          <a href={recipe.source_url} target="_blank" rel="noopener noreferrer">
            View Original Recipe
          </a>
        </p>
      )}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => alert("Edit feature coming soon!")}>Edit</button>


      <div className="recipe-nav">
        <Link to="/recipes">View All Recipes</Link>
        <Link to="/boards">View My Boards</Link>
      </div>
    </div>
  );
}
