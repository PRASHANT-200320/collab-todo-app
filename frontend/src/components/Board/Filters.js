import React from "react";
import "./Filters.css";


const Filters = ({ filters, setFilters }) => {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="🔍 Search by title..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <select
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default Filters;
