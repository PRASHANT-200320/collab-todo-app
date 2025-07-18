import React, { useState, useEffect } from "react";
import API from "../../api";
import "./indexs.css"; 

const CreateTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dueDate, setDueDate] = useState(""); 


 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users"); 
      setUsers(res.data);                      
    } catch (err) {
      console.error(" Could not load users", err.response?.data || err.message);
    }
  };
  fetchUsers();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/tasks", {
  title,
  description,
  priority,
  dueDate,
  assignedTo,
});


      // Reset form
      setTitle("");
      setDescription("");
      setPriority("Low");
      setDueDate("");

      setAssignedTo("");
      onTaskCreated();
    } catch (err) {
      alert("Failed to create task: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-task-form">
      <h3>Create New Task</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
     

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
   <label>Due Date</label>
<input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  required
/>

      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required
      >
        <option value="">Select Assignee</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.fullName}
          </option>
        ))}
      </select>


      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};

export default CreateTaskForm;
