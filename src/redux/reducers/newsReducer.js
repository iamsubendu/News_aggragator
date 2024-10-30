import {
  CLEAR_ARTICLES,
  FETCH_NEWS_SUCCESS,
  SET_FILTER,
  SET_LOADER_FALSE,
  SET_LOADER_TRUE,
  SET_PERSONALIZED_SOURCES,
} from "../actions/actionTypes";

const initialState = {
  articles: [],
  filter: {},
  personalizedSources: [],
  loading: false,
  error: false,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        articles: action.payload,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case SET_PERSONALIZED_SOURCES:
      return {
        ...state,
        personalizedSources: action.payload,
      };
    case SET_LOADER_TRUE:
      return {
        ...state,
        loading: true,
      };
    case SET_LOADER_FALSE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_ARTICLES:
      return {
        ...state,
        articles: [],
      };
    default:
      return state;
  }
};

export default newsReducer;
