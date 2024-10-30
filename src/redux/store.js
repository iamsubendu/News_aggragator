import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./reducers/newsReducer";

const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export default store;
