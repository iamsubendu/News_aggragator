import { fetchGuardianAPI, fetchNYTAPI } from "../../services/newsService";
import {
  CLEAR_ARTICLES,
  FETCH_NEWS_FAILURE,
  FETCH_NEWS_SUCCESS,
  SET_FILTER,
  SET_LOADER_FALSE,
  SET_LOADER_TRUE,
  SET_PERSONALIZED_SOURCES,
} from "./actionTypes";

export const fetchNewsSuccess = (articles) => ({
  type: FETCH_NEWS_SUCCESS,
  payload: articles,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setPersonalizedSources = (sources) => ({
  type: SET_PERSONALIZED_SOURCES,
  payload: sources,
});

export const fetchNewsFailure = (error) => ({
  type: FETCH_NEWS_FAILURE,
  payload: error,
});

export const clearArticles = () => {
  return {
    type: CLEAR_ARTICLES,
  };
};

export const nytSpecificNews = (searchText) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER_TRUE });
    dispatch(clearArticles());
    const allArticles = [];
    try {
      const nytResponse = await fetchNYTAPI(searchText);
      if (nytResponse && nytResponse.data && nytResponse.data.results) {
        const reformattedArticles = nytResponse.data.results
          .map((article) => {
            try {
              return {
                title: article.title || "Unknown",
                author: article.byline || "Unknown",
                published_at: article.published_date,
                description: article.abstract || "Unknown",
                image: article.multimedia[0]?.url || "",
              };
            } catch (error) {
              return null;
            }
          })
          .filter((article) => article !== null && article.abstract !== "");
        allArticles.push(...reformattedArticles);
      }
      if (allArticles.length > 0) {
        console.log(allArticles);
        dispatch(fetchNewsSuccess(allArticles));
      } else {
        dispatch(fetchNewsFailure("No articles available from the sources."));
      }
    } catch (error) {
      dispatch(fetchNewsFailure("Error fetching data from The NYT API"));
    } finally {
      dispatch({ type: SET_LOADER_FALSE });
    }
  };
};

export const searchNews = (searchText) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER_TRUE });
    dispatch(clearArticles());
    const allArticles = [];
    try {
      const guardianResponse = await fetchGuardianAPI(searchText);
      if (
        guardianResponse &&
        guardianResponse.data &&
        guardianResponse.data.data
      ) {
        allArticles.push(...guardianResponse.data.data);
      }
      if (allArticles.length > 0) {
        dispatch(fetchNewsSuccess(allArticles));
      } else {
        dispatch(fetchNewsFailure("No articles available from the sources."));
      }
    } catch (error) {
      dispatch(fetchNewsFailure("Error fetching data from The Guardian API"));
    } finally {
      dispatch({ type: SET_LOADER_FALSE });
    }
  };
};
