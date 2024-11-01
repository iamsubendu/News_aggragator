import React from "react";
import "../styles/NoArticleFound.css";

const NoArticleFound = ({ text = "Oops! No articles found." }) => {
  return (
    <div className="noArticleFound">
      <h3>{text}</h3>
    </div>
  );
};

export default NoArticleFound;
