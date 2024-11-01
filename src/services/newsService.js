import axios from "axios";

export const fetchNewsAPI = async (searchText, date) => {
  return axios.get(
    `https://newsapi.org/v2/everything?q=${searchText}&from=${date}&sortBy=publishedAt&y&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
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

const isValidImageUrl = (url) => {
  if (!url) return false;
  const validImageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i; // Add more formats as needed
  return validImageExtensions.test(url);
};

const checkImageExists = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

export const isImageUrlValid = async (url) => {
  const isFormatValid = isValidImageUrl(url);
  if (!isFormatValid) return false;
  const exists = await checkImageExists(url);
  return exists;
};

export const formatDate = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
};
