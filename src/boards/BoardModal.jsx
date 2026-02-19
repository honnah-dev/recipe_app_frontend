import { useState } from "react";

import { useAuth } from "../auth/AuthContext";

export default function BoardModal({ board, onClose, onSave }) {
  const { token } = useAuth();

  const [name, setName] = useState(board ? board.name : "");
  const [error, setError] = useState(null);

  async function handleSubmit() {
    if (!name.trim()) return;

    try {
      const url = board ? `/api/boards/${board.id}` : "/api/boards";
      const method = board ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to save board.");
      }

      const savedBoard = await response.json();
      onSave(savedBoard);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{board ? "Edit Board" : "Create New Board"}</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Board name..."
        />

        {error && <p className="error">{error}</p>}

        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}
