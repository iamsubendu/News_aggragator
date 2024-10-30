import React from "react";

const FilterPanel = ({ setKeyword, setDate, setCategory, setSource }) => (
  <div className="filter-panel">
    <input type="date" onChange={(e) => setDate(e.target.value)} />
    <select onChange={(e) => setCategory(e.target.value)}>
      <option value="">Select Category</option>
      <option value="technology">Technology</option>
      <option value="science">Science</option>
      {/* Add more categories as needed */}
    </select>
    <select onChange={(e) => setSource(e.target.value)}>
      <option value="">Select Source</option>
      <option value="bbc-news">BBC News</option>
      <option value="the-verge">The Verge</option>
      {/* Add more sources as needed */}
    </select>
  </div>
);

export default FilterPanel;
