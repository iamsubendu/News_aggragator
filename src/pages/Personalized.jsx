import React, { useEffect } from "react";
import "../styles/Personalized.css";
import Loading from "../components/Loading";
import NoArticleFound from "../components/NoArticleFound";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPersonalizedArticles,
  personalizedArticles,
  setOptionsForPersonalizedSources,
} from "../redux/actions/newsActions";
import NavigateToTop from "../components/NavigateToTop";

const categories = [
  "World",
  "US",
  "Science",
  "Arts",
  "Technology",
  "Sports",
  "Health",
];

const Personalized = () => {
  const selectedOptions = useSelector(
    (state) => state.news.selectedOptionsInPersonalizedResources
  );
  const personalizedSources = useSelector(
    (state) => state.news.personalizedSources
  );
  const loader = useSelector((state) => state.news.loading);
  const dispatch = useDispatch();

  const handleOptionChange = (option) => {
    const lowerCaseOption = option.toLowerCase();
    const newSelectedOptions = selectedOptions.includes(lowerCaseOption)
      ? selectedOptions.filter((item) => item !== lowerCaseOption)
      : [...selectedOptions, lowerCaseOption];

    dispatch(setOptionsForPersonalizedSources(newSelectedOptions));
  };

  useEffect(() => {
    const needToFetchArticles = selectedOptions.some(
      (category) => !personalizedSources[category]
    );

    if (needToFetchArticles) {
      if (selectedOptions.length === 0) {
        dispatch(clearPersonalizedArticles());
      } else {
        dispatch(personalizedArticles(selectedOptions));
      }
    }
  }, [selectedOptions, dispatch, personalizedSources]);

  return (
    <div className="personalized">
      <form>
        <h2>Select Categories</h2>
        <div className="categories">
          {categories.map((category, index) => (
            <div className="category" key={index}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(category.toLowerCase())}
                onChange={() => handleOptionChange(category)}
              />
              <label>{category}</label>
            </div>
          ))}
        </div>
      </form>
      <hr style={{ margin: "2rem 0" }} />
      {loader && <Loading />}
      {(!personalizedSources || personalizedSources.length === 0) &&
        !loader && <NoArticleFound />}
      {!loader &&
        selectedOptions.map(
          (category) =>
            personalizedSources[category] && (
              <div key={category} className="personalizedSources">
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div className="cards">
                  {personalizedSources[category].map((article, index) => (
                    <Card key={index} article={article} />
                  ))}
                </div>
              </div>
            )
        )}
      <NavigateToTop />
    </div>
  );
};

export default Personalized;
