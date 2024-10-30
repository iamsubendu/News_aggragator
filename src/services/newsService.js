import axios from "axios";

export const fetchNewsAPI = async (searchText) => {
  return axios.get(
    `https://newsapi.org/v2/everything?q=${searchText}&from=2024-09-24&sortBy=popularity&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
  );
};

export const fetchNYTAPI = async (searchText) => {
  return axios.get(
    `https://api.nytimes.com/svc/topstories/v2/${searchText}.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
  );
};

export const fetchGuardianAPI = async (searchText) => {
  return axios.get(
    `https://api.mediastack.com/v1/news?access_key=${process.env.REACT_APP_MEDIA_STACK_API_KEY}&keywords=${searchText}&countries=in,us,gb`
  );
};
