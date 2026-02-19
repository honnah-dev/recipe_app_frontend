import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";

import { useAuth } from "../auth/AuthContext";
import RecipeCard from "../recipes/RecipeCard";
import BoardModal from "./BoardModal";

export default function BoardDetail() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [board, setBoard] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    async function loadBoard() {
      try {
        const boardResponse = await fetch(`/api/boards/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!boardResponse.ok) {
          throw new Error("Failed to load board.");
        }
        const boardData = await boardResponse.json();
        setBoard(boardData);

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
  }, [id, token]);

  async function handleDeleteBoard() {
    const confirmed = window.confirm("Are you sure you want to delete this board? Move any recipes to another board first if you want to keep them.");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/boards/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      navigate("/boards");
    } catch (e) {
      setError(e.message);
    }
  }

  if (error) return <p className="error">{error}</p>;
  if (!board) return <p>Loading...</p>;

  return (
    <div className="board-detail">
      <Link to="/boards">← Back to Boards</Link>

      <h1>{board.name}</h1>
      <p>{recipes.length} recipes</p>

      {recipes.length === 0 ? (
        <p>No recipes in this board yet</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
      <button onClick={() => setShowEditModal(true)}>Edit Board</button>
      <button onClick={handleDeleteBoard}>Delete Board</button>

      {showEditModal && (
        <BoardModal
          board={board}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedBoard) => {
            setBoard(updatedBoard);
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}
