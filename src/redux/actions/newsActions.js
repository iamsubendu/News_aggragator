import {
  fetchGuardianAPI,
  fetchNewsAPI,
  fetchNYTAPI,
  isImageUrlValid,
  servFilterArticles,
} from "../../services/newsService";
import {
  CLEAR_ARTICLES,
  CLEAR_PERSONALIZED_SOURCES,
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

export const clearPersonalizedArticles = () => {
  return {
    type: CLEAR_PERSONALIZED_SOURCES,
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
              const publishedDate = new Date(article.published_date);
              if (isNaN(publishedDate)) {
                return null;
              }

              return {
                title: article.title,
                author: article.byline || "Unknown",
                published_at: publishedDate.toISOString().split("T")[0],
                description: article.abstract,
                image:
                  Array.isArray(article.multimedia) &&
                  article.multimedia.length > 0 &&
                  isImageUrlValid(article.multimedia[0]?.url)
                    ? article.multimedia[0].url
                    : "",
              };
            } catch (error) {
              return null;
            }
          })
          .filter(
            (article) =>
              article !== null &&
              article.title !== "" &&
              article.description !== ""
          );

        allArticles.push(...reformattedArticles);
      }
      if (allArticles.length > 0) {
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
        const reformattedArticles = guardianResponse.data.data
          .map((article) => {
            try {
              const publishedDate = new Date(article.published_at);
              if (isNaN(publishedDate)) {
                return null;
              }

              return {
                title: article.title,
                author: article.source || "Unknown",
                published_at: publishedDate.toISOString().split("T")[0],
                description: article.description,
                image: isImageUrlValid(article.image) ? article.image : "",
              };
            } catch (error) {
              return null;
            }
          })
          .filter(
            (article) =>
              article !== null &&
              article.title !== "" &&
              article.description !== ""
          );

        allArticles.push(...reformattedArticles);
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

export const searchArticles = (searchText, date) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER_TRUE });
    dispatch(clearArticles());
    const allArticles = [];

    try {
      const newsApiResponse = await fetchNewsAPI(searchText, date);
      if (
        newsApiResponse &&
        newsApiResponse.data &&
        newsApiResponse.data.articles
      ) {
        const reformattedArticles = newsApiResponse.data.articles
          .map((article) => {
            try {
              const publishedDate = new Date(article.publishedAt);
              if (isNaN(publishedDate)) {
                return null;
              }

              return {
                title: article.title,
                author: article.author || "Unknown",
                published_at: publishedDate.toISOString().split("T")[0],
                description: article.description,
                image: isImageUrlValid(article.urlToImage)
                  ? article.urlToImage
                  : "",
              };
            } catch (error) {
              return null;
            }
          })
          .filter(
            (article) =>
              article !== null &&
              article.title !== "" &&
              article.description !== ""
          );

        allArticles.push(...reformattedArticles);
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

export const filterArticles = (articles, filters) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER_TRUE });
    dispatch(clearArticles());
    const { date, source } = filters;
    try {
      const filteredResponse = await servFilterArticles(articles, date, source);

      if (filteredResponse.length > 0) {
        dispatch(setFilter(filteredResponse));
      } else {
        dispatch(
          fetchNewsFailure("No articles available after the filter added")
        );
      }
    } catch (error) {
      dispatch(
        fetchNewsFailure("Something went wrong while filtering articles")
      );
    } finally {
      dispatch({ type: SET_LOADER_FALSE });
    }
  };
};

export const personalizedArticles = (searchTerms) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER_TRUE });
    dispatch(clearArticles());
    const allArticles = {};

    try {
      for (const searchText of searchTerms) {
        const nytResponse = await fetchNYTAPI(searchText);

        if (nytResponse && nytResponse.data && nytResponse.data.results) {
          const reformattedArticles = nytResponse.data.results
            .map((article) => {
              try {
                const publishedDate = new Date(article.published_date);
                if (isNaN(publishedDate)) {
                  return null;
                }

                return {
                  title: article.title,
                  author: article.byline || "Unknown",
                  published_at: publishedDate.toISOString().split("T")[0],
                  description: article.abstract,
                  image:
                    Array.isArray(article.multimedia) &&
                    article.multimedia.length > 0 &&
                    isImageUrlValid(article.multimedia[0]?.url)
                      ? article.multimedia[0].url
                      : "",
                };
              } catch (error) {
                return null;
              }
            })
            .filter(
              (article) =>
                article !== null &&
                article.title !== "" &&
                article.description !== ""
            );

          allArticles[searchText] = reformattedArticles;
        }
      }
      if (Object.keys(allArticles).length > 0) {
        dispatch(setPersonalizedSources(allArticles));
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
