import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/FilterPanel.css";
import Card from "./Card";
import NoArticleFound from "./NoArticleFound";
import { searchArticles } from "../redux/actions/newsActions";

const FilterPanel = () => {
  const articles = useSelector((state) => state.news.articles);
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const dispatch = useDispatch();

  const uniqueSources = Array.from(
    new Set(articles.map((article) => article.author))
  );

  useEffect(() => {
    if (source || date) {
      const filtered = articles.filter((article) => {
        const matchesDate = date ? article.published_at.startsWith(date) : true;
        const matchesSource = source ? article.author === source : true;
        return matchesDate && matchesSource;
      });
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles([]);
    }
  }, [date, source, articles]);

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(searchArticles(searchText, date));
  };

  return (
    <div className="filterPanel">
      <div className="options">
        <form onSubmit={searchHandler}>
          <input
            type="text"
            name="searchText"
            placeholder="Search articles..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          name="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="">Select Source</option>
          {uniqueSources.map((author, index) => (
            <option key={index} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <div className="filteredArticles">
        {filteredArticles &&
          filteredArticles.length > 0 &&
          filteredArticles.map((article, index) => (
            <Card key={index} article={article} />
          ))}
        {filteredArticles.length === 0 && (date || source) && (
          <NoArticleFound
            text={"Oops! No articles found with current filter."}
          />
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
