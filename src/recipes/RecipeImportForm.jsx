/**
 * RecipeImportForm handles the full recipe import flow:
 * Step 1: User pastes a URL and clicks "Extract Recipe" (calls POST /api/recipes/import)
 * Step 2: User reviews/edits the extracted data, selects boards, and clicks "Save" (calls POST /api/recipes)
 */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function RecipeImportForm() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Step 1: URL input
  // If the user clicked "Import" in the Navbar, the URL is passed via location.state
  const [url, setUrl] = useState(location.state?.url || "");

  // Step 2: Extracted recipe data (editable)
  const [recipe, setRecipe] = useState(null);

  // Loading & error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [boards, setBoards] = useState([]);
  const [selectedBoards, setSelectedBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");

  // Fetch user's boards when component loads
  useEffect(() => {
    async function loadBoards() {
      const response = await fetch("/api/boards", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setBoards(data);
    }
    loadBoards();
  }, [token]);

  // Step 1: Extract recipe from URL
  async function handleExtract() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/recipes/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error("Failed to extract recipe. Please check the URL and try again.");
      }
      const data = await response.json();
      // The backend returns camelCase (imageUrl, sourceUrl, prepTime, cookTime)
      // but our database uses snake_case (image_url, source_url, prep_time, cook_time)
      // so we map them here to match what the save endpoint expects
      setRecipe({
        title: data.title,
        description: data.description,
        source_url: data.sourceUrl,
        image_url: data.imageUrl,
        prep_time: data.prepTime,
        cook_time: data.cookTime,
        servings: data.servings,
        ingredients: data.ingredients,
        instructions: data.instructions,
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // If a URL was passed from the Navbar, auto-extract immediately (skip the URL input step)
  // If a full recipe was passed from RecipeView's Edit button, load it directly into the form
  // Runs once on mount only — dependencies are intentionally omitted
  useEffect(() => {
    if (location.state?.recipe) {
      setRecipe(location.state.recipe);
    } else if (location.state?.url) {
      handleExtract();
    }
  }, []);

  // Step 2: Save the (possibly edited) recipe
  async function handleSave() {
    try {
      // If recipe.id exists, this is an existing recipe being edited (came from RecipeView's Edit button)
      // If recipe.id is undefined, this is a brand new recipe being imported from a URL
      const isEditing = Boolean(recipe.id);

      // Editing uses PUT /api/recipes/123 to update, importing uses POST /api/recipes to create
      const fetchUrl = isEditing ? `/api/recipes/${recipe.id}` : "/api/recipes";
      const method = isEditing ? "PUT" : "POST";

      // Everything below is the same for both editing and creating:
      // same headers, same body fields, same error handling, same redirect
      const response = await fetch(fetchUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Map snake_case back to camelCase to match what the backend expects
        body: JSON.stringify({
          title: recipe.title,
          description: recipe.description,
          sourceUrl: recipe.source_url,
          imageUrl: recipe.image_url,
          prepTime: recipe.prep_time,
          cookTime: recipe.cook_time,
          servings: recipe.servings,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          boards: selectedBoards,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save recipe. Please try again.");
      }
      const savedRecipe = await response.json();
      navigate(`/recipes/${savedRecipe.id}`);
    } catch (e) {
      setError(e.message);
    }
  }

  // Create a new board inline
  async function handleCreateBoard() {
    if (!newBoardName.trim()) return;

    const response = await fetch("/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newBoardName }),
    });
    const newBoard = await response.json();

    // Add to boards list and auto-select it
    setBoards([...boards, newBoard]);
    setSelectedBoards([...selectedBoards, newBoard.id]);
    setNewBoardName("");
  }

  // Show loading or URL input if no recipe extracted yet
  if (!recipe) {
    return (
      <div className="recipe-import">
        {loading ? null : (
          <>
            <h1>Import a Recipe</h1>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste recipe URL..."
            />
            <button onClick={handleExtract}>
              Extract Recipe
            </button>
          </>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  // Show editable form once recipe is extracted
  return (
    <div className="recipe-import">
      <h1>Review & Save Recipe</h1>
      <h3>Recipe Title:</h3>

      <input
        type="text"
        value={recipe.title}
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
      />
      <h3>Description:</h3>
      <textarea
        value={recipe.description}
        onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
      />

      <h3>Image:</h3>
      <input
        type="text"
        value={recipe.image_url}
        onChange={(e) => setRecipe({ ...recipe, image_url: e.target.value })}
      />
      {recipe.image_url && (
        <img src={recipe.image_url} alt={recipe.title} className="recipe-preview-image" />
      )}
      <h3>Prep Time:</h3>
      <input
        type="number"
        value={recipe.prep_time}
        onChange={(e) => setRecipe({ ...recipe, prep_time: e.target.value })}
      />
      <h3>Cook Time:</h3>
      <input
        type="number"
        value={recipe.cook_time}
        onChange={(e) => setRecipe({ ...recipe, cook_time: e.target.value })}
      />
      <h3>Servings:</h3>
      <input
        type="number"
        value={recipe.servings}
        onChange={(e) => setRecipe({ ...recipe, servings: e.target.value })}
      />

      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => {
                const newIngredients = [...recipe.ingredients];
                newIngredients[index] = e.target.value;
                setRecipe({ ...recipe, ingredients: newIngredients });
              }}
            />
          </li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>
            <textarea
              rows={1}
              value={step}
              ref={(el) => {
                if (el) {
                  el.style.height = "auto";
                  el.style.height = el.scrollHeight + "px";
                }
              }}
              onChange={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
                const newInstructions = [...recipe.instructions];
                newInstructions[index] = e.target.value;
                setRecipe({ ...recipe, instructions: newInstructions });
              }}
            />
          </li>
        ))}
      </ol>

      <h3>Source URL:</h3>
      <input
        type="text"
        value={recipe.source_url}
        onChange={(e) => setRecipe({ ...recipe, source_url: e.target.value })}
      />


      <h3>Add to Boards:</h3>
      {boards.map((board) => (
        <label key={board.id}>
          <input
            type="checkbox"
            checked={selectedBoards.includes(board.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedBoards([...selectedBoards, board.id]);
              } else {
                setSelectedBoards(selectedBoards.filter((id) => id !== board.id));
              }
            }}
          />
          {board.name}
        </label>
      ))}
      
      <div>
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="New board name..."
        />
        <button type="button" onClick={handleCreateBoard}>
          Create Board
        </button>
      </div>

      <button onClick={() => setRecipe(null)}>Cancel</button>
      <button onClick={handleSave}>Save Recipe</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
