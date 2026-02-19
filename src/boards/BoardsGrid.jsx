import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../auth/AuthContext";
import BoardModal from "./BoardModal";

export default function BoardsGrid() {
  const { token } = useAuth();
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);
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

      <div className="boards-list">
        {boards.map((board) => (
          <Link to={`/boards/${board.id}`} key={board.id} className="board-card">
            {board.image_url
              ? <img src={board.image_url} alt={board.name} className="board-card-image" />
              : <div className="board-card-placeholder"></div>
            }
            <h2>{board.name}</h2>
          </Link>
        ))}

        <button onClick={() => setShowModal(true)} className="create-board-button">
          + Create Board
        </button>

        {boards.length === 0 && (
          <p>No boards yet! Create one to organize your recipes.</p>
        )}
      </div>

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
