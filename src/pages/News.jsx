import React from "react";
import Card from "../components/Card";
import "../styles/News.css";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const News = () => {
  const articles = useSelector((state) => state.news.articles);
  const loader = useSelector((state) => state.news.loading);

  return (
    <>
      <div className="news">
        {loader && <Loading />}
        <div className="cards">
          {!loader &&
            articles &&
            articles.map((article, index) => (
              <Card key={index} article={article} />
            ))}
        </div>
      </div>
    </>
  );
};

export default News;
