import React from "react";

const TableFilters = ({ filters, setFilters, type }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder={`Search ${type} by title`}
        className="border p-2 rounded-md w-48"
      />
      <select
        name="category"
        onChange={handleChange}
        value={filters.category}
        className="border p-2 rounded-md"
      >
        <option value="">All Categories</option>
        <option value="Aptitude">Aptitude</option>
        <option value="Core">Core</option>
      </select>

      {type === "quiz" || type == "problems" && (
        <select
          name="difficulty"
          onChange={handleChange}
          value={filters.difficulty}
          className="border p-2 rounded-md"
        >
          <option value="">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      )}

      <select
        name="isAvailable"
        onChange={handleChange}
        value={filters.isAvailable}
        className="border p-2 rounded-md"
      >
        <option value="">Availability</option>
        <option value="true">Available</option>
        <option value="false">Unavailable</option>
      </select>
    </div>
  );
};

export default TableFilters;
