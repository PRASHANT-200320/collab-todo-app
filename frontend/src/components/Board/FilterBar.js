import React from "react";
import "./FilterBar.css";

const FilterBar = ({ search, setSearch, priority, setPriority, status, setStatus }) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">All Priorities</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option>Todo</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
    </div>
  );
};

export default FilterBar;
