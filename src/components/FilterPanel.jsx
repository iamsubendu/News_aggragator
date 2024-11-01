import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterArticles, searchArticles } from "../redux/actions/newsActions";
import "../styles/FilterPanel.css";

const FilterPanel = () => {
  const articles = useSelector((state) => state.news.articles);
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const dispatch = useDispatch();

  const uniqueSources = Array.from(
    new Set(articles.map((article) => article.author))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "source") setSource(value);
    else setDate(value);
    const newFilters = {
      date: name === "date" ? value : date,
      source: name === "source" ? value : source,
    };
    dispatch(filterArticles(articles, newFilters));
  };

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(searchArticles(searchText, date));
  };

  return (
    <div className="filterPanel">
      <form onSubmit={searchHandler}>
        <input
          type="text"
          name="searchText"
          placeholder="Search articles..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" onClick={searchHandler}>
          Search
        </button>
      </form>
      <input type="date" name="date" value={date} onChange={handleChange} />
      <select name="source" value={source} onChange={handleChange}>
        <option value="">Select Source</option>
        {uniqueSources.map((author, index) => (
          <option key={index} value={author}>
            {author}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterPanel;
