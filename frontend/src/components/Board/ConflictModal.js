import React from "react";
import API from "../../api";
// import "./indexs.css"; 

import "./ConflictModal.css";

const ConflictModal = ({ conflict, onClose }) => {
  const { local, server } = conflict;

  const handleMerge = async () => {
    try {
      const merged = { ...server, ...local };
      await API.put(`/tasks/${server._id}`, merged);
      onClose();
    } catch (err) {
      console.error("Merge failed", err);
      alert("Failed to merge. Try again.");
    }
  };

  const handleOverwrite = async () => {
    try {
      await API.put(`/tasks/${server._id}`, local);
      onClose();
    } catch (err) {
      console.error("Overwrite failed", err);
      alert("Failed to overwrite. Try again.");
    }
  };

  return (
    <div className="conflict-modal-overlay">
      <div className="conflict-modal">
        <h3>⚠️ Conflict Detected!</h3>
        <p>
          This task was updated by someone else. What would you like to do?
        </p>

        <div className="conflict-buttons">
          <button className="merge" onClick={handleMerge}>
            Merge Changes
          </button>
          <button className="overwrite" onClick={handleOverwrite}>
            Overwrite with Mine
          </button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;
