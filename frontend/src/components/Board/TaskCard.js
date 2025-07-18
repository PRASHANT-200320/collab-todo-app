import React from "react";
import "./TaskCard.css"; 

const TaskCard = ({ task }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text", task._id);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className="task-card"
      draggable={true}
      onDragStart={handleDragStart}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      {task.assignedTo && (
        <div className="task-avatar">
          <div className="avatar-circle">
            {getInitials(task.assignedTo.fullName)}
          </div>
          <small>{task.assignedTo.fullName}</small>
        </div>
      )}

      {task.dueDate && (
        <small>
          <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </small>
      )}
    </div>
  );
};

export default TaskCard;
