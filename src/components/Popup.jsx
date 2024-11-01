import React from "react";
import "../styles/Popup.css";

const Popup = ({ article, onClose }) => {
  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <div className="popupBody">
          <img
            src={article.image}
            alt={article.source}
            className="popupImage"
          />
          <div className="textContent">
            <h2>{article.title}</h2>
            <p>
              <strong>Author:</strong> {article.author}
            </p>
            <p>
              <strong>Published At:</strong> {article.published_at}
            </p>
            <p>
              <strong>Description:</strong> {article.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
