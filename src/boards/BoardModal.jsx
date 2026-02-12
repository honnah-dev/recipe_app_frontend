/**
 * BoardModal is a reusable modal for creating or editing a board.
 * Pass board={null} for create mode, or board={existingBoard} for edit mode.
 * Uses onClose and onSave callbacks to communicate with the parent component.
 */
import { useState } from "react";

import { useAuth } from "../auth/AuthContext";
// These 3 props come from the parent (BoardsGrid):
//   board = null means CREATE mode, board = {id, name} means EDIT mode
//   onClose = function to hide the modal (called when user clicks Cancel)
//   onSave = function to run after saving (called when Save succeeds)
export default function BoardModal({ board, onClose, onSave }) {
  const { token } = useAuth();

  // If we're editing, pre-fill with the board's name. If creating, start empty.
  // board ? board.name : "" means: "Does board exist? Use its name. Otherwise use empty string."
  const [name, setName] = useState(board ? board.name : "");
  const [error, setError] = useState(null);

  async function handleSubmit() {
    // name.trim() removes spaces from both ends of the string.
    // "   " becomes "" which is falsy.
    // So !name.trim() means: "if name is empty or just spaces, stop here."
    if (!name.trim()) return;

    try {
      // These are if/else statements written in shorthand (called a ternary).
      // board ? valueIfTrue : valueIfFalse
      //
      // const url = board ? `/api/boards/${board.id}` : "/api/boards";
      // Same as writing:
      //   if (board) { url = `/api/boards/${board.id}`; }   <-- EDIT: update specific board
      //   else { url = "/api/boards"; }                      <-- CREATE: make new board
      const url = board ? `/api/boards/${board.id}` : "/api/boards";
      const method = board ? "PUT" : "POST";

      // fetch(url, { ... }) is the same as fetch("/api/boards", { ... })
      // We're just using a VARIABLE instead of typing the URL directly.
      // That way the same fetch works for both create AND edit.
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
      // onSave sends the new/updated board back to BoardsGrid
      // so it can update its list without re-fetching
      onSave(savedBoard);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    // modal-overlay = the dark background behind the modal
    <div className="modal-overlay">
      {/* modal = the white box in the center */}
      <div className="modal">
        <h2>{board ? "Edit Board" : "Create New Board"}</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Board name..."
        />

        {error && <p className="error">{error}</p>}

        {/* onClose comes from BoardsGrid - it sets showModal to false */}
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}
