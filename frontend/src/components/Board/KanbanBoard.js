import React, { useEffect, useState } from "react";
import API from "../../api";
import TaskCard from "./TaskCard";
import CreateTaskForm from "./CreateTaskForm";
import ActivityLog from "./ActivityLog";
import Filters from "./Filters";
import { useAuth } from "../../context/AuthContext";
import "./KanbanBoard.css";



const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ priority: "", search: "" });

  const { user } = useAuth();

  useEffect(() => {
    fetchData();
    const socket = new WebSocket("ws://localhost:5000"); 
    return () => socket.close();
  }, []);

  const fetchData = async () => {
    try {
      const [taskRes, logRes, userRes] = await Promise.all([
        API.get("/tasks"),
        API.get("/logs"),
        API.get("/auth/users"),
      ]);
      setTasks(taskRes.data);
      setLogs(logRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchPriority = filters.priority ? task.priority === filters.priority : true;
    const matchSearch = task.title.toLowerCase().includes(filters.search.toLowerCase());
    return matchPriority && matchSearch;
  });

  const groupedTasks = {
    Todo: filteredTasks.filter((task) => task.status === "Todo"),
    "In Progress": filteredTasks.filter((task) => task.status === "In Progress"),
    Done: filteredTasks.filter((task) => task.status === "Done"),
  };

  const handleDrop = async (e, status) => {
    const id = e.dataTransfer.getData("text");
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchData(); // refresh after drop
    } catch (err) {
      console.error("Failed to update task status");
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="kanban-container">
      {/* Left: Form */}
      <div className="create-task-form">
        <CreateTaskForm refresh={fetchData} users={users} />
      </div>

      {/* Middle: Task Board */}
      <div className="board-content">
        <Filters filters={filters} setFilters={setFilters} />
        <div className="board-columns" style={{ display: "flex", gap: "12px" }}>
          {Object.entries(groupedTasks).map(([status, taskList]) => (
            <div
              className="column"
              key={status}
              onDrop={(e) => handleDrop(e, status)}
              onDragOver={handleDragOver}
            >
              <h3>{status}</h3>
              {taskList.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Activity Log */}
      <div className="activity-log">
        <ActivityLog logs={logs} />
      </div>
    </div>
  );
};

export default KanbanBoard;
