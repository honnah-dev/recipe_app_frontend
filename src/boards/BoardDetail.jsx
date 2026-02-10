import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

import { useAuth } from "../auth/AuthContext";
import RecipeCard from "../recipes/RecipeCard";

// This page shows a SINGLE board and the recipes inside it.
// URL: /boards/:id  (e.g., /boards/5)
// Similar to RecipesGrid but only shows recipes in ONE board.
export default function BoardDetail() {
  const { token } = useAuth();

  // useParams() grabs the :id from the URL.
  // If the URL is /boards/5, then id = "5"
  const { id } = useParams();

  // Two separate pieces of state:
  // board = the board info (name, created_at)
  // recipes = the recipes that belong to this board
  const [board, setBoard] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  // When this component loads, make TWO API calls:
  // 1. Get the board info (so we can show the name)
  // 2. Get the recipes in this board (so we can show the cards)
  useEffect(() => {
    async function loadBoard() {
      try {
        // FETCH #1: Get the board itself (name, etc.)
        // This hits: GET /api/boards/5
        const boardResponse = await fetch(`/api/boards/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!boardResponse.ok) {
          throw new Error("Failed to load board.");
        }
        const boardData = await boardResponse.json();
        setBoard(boardData);

        // FETCH #2: Get the recipes inside this board
        // This hits: GET /api/boards/5/recipes
        const recipesResponse = await fetch(`/api/boards/${id}/recipes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!recipesResponse.ok) {
          throw new Error("Failed to load recipes.");
        }
        const recipesData = await recipesResponse.json();
        setRecipes(recipesData);
      } catch (error) {
        setError(error.message);
      }
    }
    loadBoard();
  }, [id, token]); // Re-run if the board id or token changes

  if (error) return <p className="error">{error}</p>;
  // While waiting for the API response, board is still null
  if (!board) return <p>Loading...</p>;

  return (
    <div className="board-detail">
      {/* Link back to the boards list page (/boards) */}
      <Link to="/boards">← Back to Boards</Link>

      <h1>{board.name}</h1>
      {/* recipes.length = how many recipes are in the array */}
      <p>{recipes.length} recipes</p>

      {/* Same pattern as RecipesGrid:
          If no recipes, show empty message.
          Otherwise, loop through and render a RecipeCard for each one. */}
      {recipes.length === 0 ? (
        <p>No recipes in this board yet</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
    </div>
  );
}
