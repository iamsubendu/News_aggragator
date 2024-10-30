import React, { useState } from "react";
import noImage from "../assets/noImage.png";
import "../styles/Card.css";
import { format } from "timeago.js";
import Loading from "./Loading";

const Card = ({ article }) => {
  const [isLoading, setIsLoading] = useState(true);

  const date = new Date(article.published_at);
  const formattedDate = format(date);

  return (
    <div className="card">
      <div className="left">
        {isLoading && <Loading />}
        <img
          src={article.image === null ? noImage : article.image}
          alt={article.source}
          className="img-fluid"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          style={{ display: isLoading ? "none" : "block" }}
        />
      </div>
      <div className="textContent">
        <p className="text author">{article.author}</p>
        <h5 className="text title">{article.title}</h5>
        <p className="text description">{article.description}</p>
        <p className="text time">
          <small className="text text-body-secondary">{formattedDate}</small>
        </p>
      </div>
    </div>
  );
};

export default Card;
