import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../auth/AuthContext";
import BoardModal from "./BoardModal";

export default function BoardsGrid() {
  const { token } = useAuth();
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);

  // showModal is just a true/false switch.
  // false = modal is hidden. true = modal is visible.
  // Think of it like a light switch for the modal.
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchBoards() {
      try {
        const response = await fetch("/api/boards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setBoards(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchBoards();
  }, [token]);

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="boards-grid">
      <h1>My Boards</h1>

      {/* The curly braces {} in JSX mean "run some JavaScript here"
          Without {}, everything is just HTML. With {}, you can put logic in.
          So {boards.map(...)} means: "loop through boards and render something for each one"
          It's the JSX version of a for-loop. */}
      {boards.map((board) => (
        <Link to={`/boards/${board.id}`} key={board.id} className="board-card">
          <h2>{board.name}</h2>
        </Link>
      ))}

      {/* STEP 1: User clicks this button, which flips showModal to true */}
      <button onClick={() => setShowModal(true)} className="board-card">
        + Create Board
      </button>

      {boards.length === 0 && (
        <p>No boards yet! Create one to organize your recipes.</p>
      )}

      {/* STEP 2: This is like an if-statement in JSX.
          It reads as: "If showModal is true, THEN show BoardModal"
          When showModal is false, this whole thing is skipped/hidden.

          So: showModal && <BoardModal /> means:
            - showModal is false? Don't render anything.
            - showModal is true? Render the BoardModal component.
      */}
      {/* STEP 3: onClose - when user clicks "Cancel", flip showModal back to false, which hides the modal */}
      {/* STEP 4: onSave - when user clicks "Save", BoardModal sends us the newBoard. We add it to our list, then hide the modal. */}
      {showModal && (
        <BoardModal
          board={null}
          onClose={() => setShowModal(false)}
          onSave={(newBoard) => {
            setBoards([...boards, newBoard]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
